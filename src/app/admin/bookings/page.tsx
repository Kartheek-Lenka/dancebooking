import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookingTable } from "@/components/admin/booking-table";
import { BookingFilters } from "@/components/admin/booking-filters";
import { Prisma } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Bookings",
};

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const status = typeof params.status === "string" ? params.status : "";
  const danceStyle = typeof params.danceStyle === "string" ? params.danceStyle : "";
  const occasionType = typeof params.occasionType === "string" ? params.occasionType : "";
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const where: Prisma.BookingWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }
  if (status) where.status = status as "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  if (danceStyle) where.danceStyle = danceStyle;
  if (occasionType) where.occasionType = occasionType;

  const [bookings, total] = await Promise.all([
    db.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.booking.count({ where }),
  ]);

  const serializedBookings = bookings.map((b) => ({
    ...b,
    performanceDate: b.performanceDate.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500">
          Manage all booking requests ({total} total)
        </p>
      </div>

      <BookingFilters />
      <BookingTable bookings={serializedBookings} />

      {total > limit && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <a
              href={`/admin/bookings?${new URLSearchParams({
                ...(search && { search }),
                ...(status && { status }),
                ...(danceStyle && { danceStyle }),
                ...(occasionType && { occasionType }),
                page: String(page - 1),
              }).toString()}`}
              className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
            >
              Previous
            </a>
          )}
          <span className="text-sm text-gray-500">
            Page {page} of {Math.ceil(total / limit)}
          </span>
          {page < Math.ceil(total / limit) && (
            <a
              href={`/admin/bookings?${new URLSearchParams({
                ...(search && { search }),
                ...(status && { status }),
                ...(danceStyle && { danceStyle }),
                ...(occasionType && { occasionType }),
                page: String(page + 1),
              }).toString()}`}
              className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
            >
              Next
            </a>
          )}
        </div>
      )}
    </div>
  );
}
