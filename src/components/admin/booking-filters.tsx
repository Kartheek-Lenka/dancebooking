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
          placeholder="Search by name, email, phone, or song..."
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
        defaultValue={searchParams.get("lessonMode") || ""}
        onChange={(e) => updateParam("lessonMode", e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        <option value="">All Modes</option>
        {siteConfig.lessonModes.map((mode) => (
          <option key={mode.value} value={mode.value}>
            {mode.label}
          </option>
        ))}
      </select>
      <select
        defaultValue={searchParams.get("songIndustry") || ""}
        onChange={(e) => updateParam("songIndustry", e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        <option value="">All Industries</option>
        {siteConfig.songIndustries.map((industry) => (
          <option key={industry.value} value={industry.value}>
            {industry.label}
          </option>
        ))}
      </select>
    </div>
  );
}
