import { NextResponse } from "next/server";
import { getApprovedReviewsForProperty } from "@/lib/propertyReviews";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: propertyId } = await params;
    const reviews = await getApprovedReviewsForProperty(propertyId);

    return NextResponse.json({ ok: true, reviews });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
