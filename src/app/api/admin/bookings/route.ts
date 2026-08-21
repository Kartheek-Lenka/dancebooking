import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db, withDbTimeout } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json(
      { error: "Database not configured", bookings: [], total: 0, page: 1, totalPages: 0 },
      { status: 200 }
    );
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const lessonMode = searchParams.get("lessonMode") || "";
  const page = parseInt(searchParams.get("page") || "1") || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
      { songPreference: { contains: search } },
    ];
  }

  if (status) where.status = status;
  if (lessonMode) where.lessonMode = lessonMode;
  const songIndustry = searchParams.get("songIndustry") || "";
  if (songIndustry) where.songIndustry = songIndustry;

  const data = await withDbTimeout(
    () =>
      Promise.all([
        db!.booking.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        db!.booking.count({ where }),
      ]),
    null,
    10000
  );

  if (!data) {
    return NextResponse.json(
      { error: "Database timeout", bookings: [], total: 0, page, totalPages: 0 },
      { status: 503 }
    );
  }

  const [bookings, total] = data;

  return NextResponse.json({
    bookings,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
