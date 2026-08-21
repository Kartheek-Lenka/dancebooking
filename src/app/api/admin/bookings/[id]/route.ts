import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db, withDbTimeout } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;

  const booking = await withDbTimeout(
    () => db!.booking.findUnique({ where: { id } }),
    null,
    10000
  );

  if (booking === null) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;
  const body = await request.json();

  if (!body.status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const existing = await withDbTimeout(
      () => db!.booking.findUnique({ where: { id } }),
      null,
      10000
    );
    if (existing === null) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const booking = await withDbTimeout(
      () => db!.booking.update({ where: { id }, data: { status: body.status } }),
      null,
      10000
    );

    if (!booking) {
      return NextResponse.json({ error: "Database timeout" }, { status: 503 });
    }

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;

  try {
    const existing = await withDbTimeout(
      () => db!.booking.findUnique({ where: { id } }),
      null,
      10000
    );
    if (existing === null) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await withDbTimeout(
      () => db!.booking.delete({ where: { id } }),
      null,
      10000
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
