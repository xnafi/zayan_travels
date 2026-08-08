import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations/service.schema";
import slugify from "slugify";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);

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

    const slug = slugify(parsed.data.title, { lower: true, strict: true });

    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A service with this title already exists" },
        { status: 409 }
      );
    }

    const service = await prisma.service.create({
      data: {
        ...parsed.data,
        slug,
      },
    });

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create service" },
      { status: 500 }
    );
  }
}