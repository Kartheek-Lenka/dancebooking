import { NextRequest, NextResponse } from "next/server";
import { db, withDbTimeout } from "@/lib/db";

const VALID_PAYMENT_STATUSES = ["PENDING", "PAID"];
const VALID_PAYMENT_METHODS = ["PHONEPE", "CASH", "UPI", "BANK_TRANSFER", "OTHER"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    if (body.paymentStatus && !VALID_PAYMENT_STATUSES.includes(body.paymentStatus)) {
      return NextResponse.json({ error: "Invalid payment status" }, { status: 400 });
    }

    if (body.paymentMethod && !VALID_PAYMENT_METHODS.includes(body.paymentMethod)) {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
    }

    const existing = await withDbTimeout(
      () => db!.booking.findUnique({ where: { id } }),
      undefined,
      10000
    );

    if (existing === undefined) {
      return NextResponse.json({ error: "Database is taking too long. Please try again." }, { status: 503 });
    }

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};

    if (body.paymentStatus) {
      updateData.paymentStatus = body.paymentStatus;
      if (body.paymentStatus === "PAID") {
        updateData.paidAt = new Date();
        updateData.status = "CONFIRMED";
      }
    }
    if (body.paymentMethod) {
      updateData.paymentMethod = body.paymentMethod;
    }

    const booking = await withDbTimeout(
      () => db!.booking.update({ where: { id }, data: updateData }),
      null,
      10000
    );

    if (!booking) {
      return NextResponse.json({ error: "Database is taking too long. Please try again." }, { status: 503 });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}
