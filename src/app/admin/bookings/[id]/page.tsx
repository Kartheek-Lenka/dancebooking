import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/admin/booking-status-badge";
import { BookingActions } from "./booking-actions";
import { formatSongIndustry } from "@/lib/songs";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Details",
};

function formatLessonMode(mode: string) {
  return mode === "HOME_SERVICE" ? "Home service" : "Online Zoom class";
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (!db) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow-sm">
          Database not configured.
        </div>
      </div>
    );
  }

  const { id } = await params;
  const booking = await db.booking.findUnique({ where: { id } });

  if (!booking) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
          <p className="text-sm text-gray-500">
            Created {format(booking.createdAt, "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <BookingStatusBadge status={booking.status} />
          <PaymentStatusBadge status={booking.paymentStatus} />
        </div>
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
            Slot
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-gray-500">Preferred date</dt>
              <dd className="font-medium text-gray-900">
                {format(booking.slotDate, "MMMM d, yyyy")}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Preferred time</dt>
              <dd className="font-medium text-gray-900">{booking.preferredTime}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Lesson mode</dt>
              <dd className="font-medium text-gray-900">
                {formatLessonMode(booking.lessonMode)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Booking fee</dt>
              <dd className="font-medium text-gray-900">₹{booking.bookingFee}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Song
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-gray-500">Industry</dt>
            <dd className="font-medium text-gray-900">
              {formatSongIndustry(booking.songIndustry)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">Song</dt>
            <dd className="font-medium text-gray-900">{booking.songPreference}</dd>
          </div>
          {booking.songAlbum && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-gray-500">Album / movie</dt>
              <dd className="font-medium text-gray-900">{booking.songAlbum}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Payment
        </h2>
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-gray-500">Status</dt>
            <dd className="mt-1"><PaymentStatusBadge status={booking.paymentStatus} /></dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">Method</dt>
            <dd className="mt-1 font-medium text-gray-900">
              {booking.paymentMethod || "—"}
            </dd>
          </div>
          {booking.paidAt && (
            <div>
              <dt className="text-xs text-gray-500">Paid at</dt>
              <dd className="mt-1 font-medium text-gray-900">
                {format(booking.paidAt, "MMM d, yyyy 'at' h:mm a")}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {booking.address && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Home visit address
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{booking.address}</p>
        </div>
      )}

      {booking.message && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Additional notes
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{booking.message}</p>
        </div>
      )}

      <BookingActions bookingId={booking.id} currentStatus={booking.status} />
    </div>
  );
}
