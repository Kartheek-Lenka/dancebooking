import Link from "next/link";
import { BookingStatusBadge } from "./booking-status-badge";
import { Eye } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  occasionType: string;
  danceStyle: string;
  performanceDate: string;
  performanceType: string;
  status: string;
  createdAt: string;
}

export function BookingTable({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
        <p className="text-gray-500">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 hidden sm:table-cell">Occasion</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 hidden md:table-cell">Dance Style</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 hidden lg:table-cell">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 hidden lg:table-cell">Type</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 hidden xl:table-cell">Created</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b last:border-b-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-warm-dark">{booking.name}</p>
                    <p className="text-xs text-gray-500 sm:hidden">{booking.occasionType}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{booking.occasionType}</td>
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{booking.danceStyle}</td>
                <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                  {format(new Date(booking.performanceDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{booking.performanceType}</td>
                <td className="px-4 py-3">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden xl:table-cell">
                  {format(new Date(booking.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
