import { cn } from "@/lib/utils";

export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID";

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800 border border-amber-200",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 border border-blue-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border border-red-200",
  },
};

const paymentConfig: Record<PaymentStatus, { label: string; className: string }> = {
  PENDING: {
    label: "Payment Pending",
    className: "bg-amber-100 text-amber-800 border border-amber-200",
  },
  PAID: {
    label: "Paid",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  },
};

export function BookingStatusBadge({ status }: { status: BookingStatus | string }) {
  const config = statusConfig[status as BookingStatus] || statusConfig.PENDING;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus | string }) {
  const config = paymentConfig[status as PaymentStatus] || paymentConfig.PENDING;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
