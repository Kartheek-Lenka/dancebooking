import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";
import Link from "next/link";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (!db) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of your bookings</p>
        </div>
        <DashboardStats stats={{ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 }} />
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow-sm">
          Database not configured. Bookings will appear here once the database is set up.
        </div>
      </div>
    );
  }

  const [total, pending, confirmed, completed, cancelled, recentBookings] =
    await Promise.all([
      db.booking.count(),
      db.booking.count({ where: { status: "PENDING" } }),
      db.booking.count({ where: { status: "CONFIRMED" } }),
      db.booking.count({ where: { status: "COMPLETED" } }),
      db.booking.count({ where: { status: "CANCELLED" } }),
      db.booking.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your bookings</p>
      </div>

      <DashboardStats
        stats={{ total, pending, confirmed, completed, cancelled }}
      />

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Bookings
          </h2>
          <Link
            href="/admin/bookings"
            className="text-sm font-medium text-maroon hover:text-maroon-light"
          >
            View all
          </Link>
        </div>
        <div className="divide-y">
          {recentBookings.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-gray-500">
              No bookings yet.
            </div>
          ) : (
            recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">
                    {booking.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.occasionType} · {booking.danceStyle}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-sm text-gray-500 sm:block">
                    {format(new Date(booking.performanceDate), "MMM d, yyyy")}
                  </span>
                  <BookingStatusBadge status={booking.status} />
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
