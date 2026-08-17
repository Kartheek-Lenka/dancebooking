"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { siteConfig } from "@/config/site";

export function BookingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/admin/bookings?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => updateParam("search", e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>
      <select
        defaultValue={searchParams.get("status") || ""}
        onChange={(e) => updateParam("status", e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        <option value="">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <select
        defaultValue={searchParams.get("danceStyle") || ""}
        onChange={(e) => updateParam("danceStyle", e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        <option value="">All Dance Styles</option>
        {siteConfig.danceStyles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
      <select
        defaultValue={searchParams.get("occasionType") || ""}
        onChange={(e) => updateParam("occasionType", e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        <option value="">All Occasions</option>
        {siteConfig.occasionTypes.map((occ) => (
          <option key={occ} value={occ}>
            {occ}
          </option>
        ))}
      </select>
    </div>
  );
}
