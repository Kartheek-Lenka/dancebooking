import { cn } from "@/lib/utils";
import { Calendar, Clock, CheckCircle2, XCircle, TrendingUp, IndianRupee } from "lucide-react";

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  paidCount?: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}

function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border bg-white p-5 shadow-sm", className)}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-warm-dark">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function DashboardStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <StatCard
        label="Total Bookings"
        value={stats.total}
        icon={<TrendingUp className="h-5 w-5 text-gray-600" />}
      />
      <StatCard
        label="Pending"
        value={stats.pending}
        icon={<Clock className="h-5 w-5 text-amber-600" />}
      />
      <StatCard
        label="Confirmed"
        value={stats.confirmed}
        icon={<Calendar className="h-5 w-5 text-blue-600" />}
      />
      <StatCard
        label="Completed"
        value={stats.completed}
        icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
      />
      <StatCard
        label="Cancelled"
        value={stats.cancelled}
        icon={<XCircle className="h-5 w-5 text-red-600" />}
      />
      <StatCard
        label="Paid"
        value={stats.paidCount ?? 0}
        icon={<IndianRupee className="h-5 w-5 text-gold" />}
      />
    </div>
  );
}
