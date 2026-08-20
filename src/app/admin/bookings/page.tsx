import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookingTable } from "@/components/admin/booking-table";
import { BookingFilters } from "@/components/admin/booking-filters";
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

  if (!db) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500">Manage all slot booking requests</p>
        </div>
        <BookingFilters />
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow-sm">
          Database not configured. Bookings will appear here once the database is set up.
        </div>
      </div>
    );
  }

  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const status = typeof params.status === "string" ? params.status : "";
  const lessonMode = typeof params.lessonMode === "string" ? params.lessonMode : "";
  const songIndustry =
    typeof params.songIndustry === "string" ? params.songIndustry : "";
  const page = typeof params.page === "string" ? Math.max(1, parseInt(params.page) || 1) : 1;
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
      { songAlbum: { contains: search } },
    ];
  }
  if (status) where.status = status;
  if (lessonMode) where.lessonMode = lessonMode;
  if (songIndustry) where.songIndustry = songIndustry;

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
    slotDate: b.slotDate.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    paidAt: b.paidAt?.toISOString() ?? null,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500">
          Manage all slot booking requests ({total} total)
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
                ...(lessonMode && { lessonMode }),
                ...(songIndustry && { songIndustry }),
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
                ...(lessonMode && { lessonMode }),
                ...(songIndustry && { songIndustry }),
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
