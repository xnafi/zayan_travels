import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/google-places";

export async function GET() {
  try {
    const data = await fetchGoogleReviews();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}