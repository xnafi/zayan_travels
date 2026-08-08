import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact.schema";
import { getEnv } from "@/lib/env";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, email, phone, destinationCountry, message } = parsed.data;
    const env = getEnv();
    const resend = new Resend(env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Zayan Travels <onboarding@resend.dev>",
      to: [env.CONTACT_EMAIL],
      subject: `New Contact Inquiry from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1B4FD8; margin-bottom: 20px;">New Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0F172A; width: 200px;">Full Name:</td>
              <td style="padding: 8px 0; color: #64748B;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0F172A;">Email:</td>
              <td style="padding: 8px 0; color: #64748B;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0F172A;">Phone:</td>
              <td style="padding: 8px 0; color: #64748B;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0F172A;">Destination:</td>
              <td style="padding: 8px 0; color: #64748B;">${destinationCountry}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #F8FAFC; border-radius: 8px;">
            <p style="font-weight: bold; color: #0F172A; margin-bottom: 8px;">Message:</p>
            <p style="color: #64748B; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: null }, { status: 201 });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}