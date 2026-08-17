import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";
import { BookingActions } from "./booking-actions";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Details",
};

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;

  const booking = await db.booking.findUnique({
    where: { id },
  });

  if (!booking) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Booking Details
          </h1>
          <p className="text-sm text-gray-500">
            Created {format(booking.createdAt, "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Customer
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-gray-500">Name</dt>
              <dd className="font-medium text-gray-900">{booking.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Email</dt>
              <dd className="font-medium text-gray-900">{booking.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Phone</dt>
              <dd className="font-medium text-gray-900">{booking.phone}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Event
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-gray-500">Occasion</dt>
              <dd className="font-medium text-gray-900">
                {booking.occasionType}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Performance Date</dt>
              <dd className="font-medium text-gray-900">
                {format(booking.performanceDate, "MMMM d, yyyy")}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Dance Style</dt>
              <dd className="font-medium text-gray-900">
                {booking.danceStyle}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Performance Type</dt>
              <dd className="font-medium text-gray-900">
                {booking.performanceType}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {booking.message && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Additional Information
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{booking.message}</p>
        </div>
      )}

      <BookingActions bookingId={booking.id} currentStatus={booking.status} />
    </div>
  );
}
