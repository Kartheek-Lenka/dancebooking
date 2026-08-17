"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const statuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

export function BookingActions({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleStatusUpdate() {
    if (status === currentStatus) return;
    setIsUpdating(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/bookings/" + bookingId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        setMessage("Failed to update status");
        return;
      }

      setMessage("Status updated successfully");
      router.refresh();
    } catch {
      setMessage("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const response = await fetch("/api/admin/bookings/" + bookingId, {
        method: "DELETE",
      });

      if (!response.ok) {
        setMessage("Failed to delete booking");
        setShowDeleteConfirm(false);
        return;
      }

      router.push("/admin/bookings");
    } catch {
      setMessage("Failed to delete booking");
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        Booking Status
      </h2>

      {message && (
        <div
          className={
            "mb-4 rounded-lg p-3 text-sm " +
            (message.includes("Failed")
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200")
          }
        >
          {message}
        </div>
      )}

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof statuses[number])}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={handleStatusUpdate}
          loading={isUpdating}
          disabled={isUpdating || status === currentStatus}
        >
          Update Status
        </Button>
      </div>

      <div className="mt-6 border-t pt-6">
        {!showDeleteConfirm ? (
          <Button
            variant="outline"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            Delete Booking
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-sm text-red-600">
              Are you sure? This cannot be undone.
            </p>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              loading={isDeleting}
              disabled={isDeleting}
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Confirm Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
