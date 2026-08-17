import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured. Please try again later." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Invalid form data" },
        { status: 400 }
      );
    }

    const data = result.data;

    const recentDuplicate = await db.booking.findFirst({
      where: {
        email: data.email,
        phone: data.phone,
        performanceDate: new Date(data.performanceDate),
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000),
        },
      },
    });

    if (recentDuplicate) {
      return NextResponse.json(
        { error: "A similar booking request was recently submitted. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const booking = await db.booking.create({
      data: {
        name: data.name,
        occasionType: data.occasionType,
        danceStyle: data.danceStyle,
        email: data.email,
        phone: data.phone,
        performanceDate: new Date(data.performanceDate),
        performanceType: data.performanceType,
        message: data.message || null,
      },
    });

    return NextResponse.json(
      { success: true, bookingId: booking.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Something went wrong while submitting your request. Please try again." },
      { status: 500 }
    );
  }
}
