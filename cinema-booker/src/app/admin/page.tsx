// src/app/admin/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Booking = {
  id: string;
  user: string;
  movie: string;
  showtime: string;
  seats: string;
  total: number;
  status: "CONFIRMED" | "CANCELLED" | "PENDING";
};

type ReviewReport = {
  id: string;
  user: string;
  movie: string;
  reason: string;
  submittedAt: string;
};

export default function AdminHomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // ---- Client-side admin guard (keep your middleware too) ----
  useEffect(() => {
    if (status === "authenticated") {
      // adjust this check to match how you store roles on your user/session
      const isAdmin =
        (session?.user as any)?.role === "admin" ||
        (session?.user as any)?.roles?.includes?.("admin");
      if (!isAdmin) router.replace("/");
    }
  }, [status, session, router]);

  // ---- Mock data (swap for real fetch later) ----
  const [dateRange, setDateRange] = useState<"today" | "7d" | "30d">("today");
  const [theater, setTheater] = useState("All");
  const [statusFilter, setStatusFilter] =
    useState<"ALL" | "CONFIRMED" | "CANCELLED" | "PENDING">("ALL");

  const kpis = useMemo(
    () => [
      { label: "Bookings Today", value: "142", sub: "+8% vs yesterday", icon: "🎟️" },
      { label: "Revenue Today", value: "$3,920", sub: "+5% trend", icon: "💵" },
      { label: "Upcoming Shows (24h)", value: "27", sub: "5 locations", icon: "🎬" },
      { label: "Refund/Fail Rate", value: "1.8%", sub: "healthy", icon: "✅" },
    ],
    []
  );

  const bookings: Booking[] = [
    { id: "B-9213", user: "sara@demo.com", movie: "Oppenheimer", showtime: "2025-10-26 18:30", seats: "E11,E12", total: 28.0, status: "CONFIRMED" },
    { id: "B-9212", user: "mike@demo.com", movie: "Interstellar", showtime: "2025-10-26 20:15", seats: "C7", total: 14.0, status: "PENDING" },
    { id: "B-9211", user: "nina@demo.com", movie: "La La Land", showtime: "2025-10-26 16:00", seats: "A1,A2,A3", total: 42.0, status: "CANCELLED" },
  ];
  const reports: ReviewReport[] = [
    { id: "R-1103", user: "alex@demo.com", movie: "Get Out", reason: "Inappropriate language", submittedAt: "2025-10-26 11:22" },
    { id: "R-1102", user: "lee@demo.com", movie: "Superbad", reason: "Spam / off-topic", submittedAt: "2025-10-26 09:44" },
  ];

  const filtered = bookings.filter((b) => (statusFilter === "ALL" ? true : b.status === statusFilter));

  // Block rendering until we know session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0b1221] text-white grid place-items-center">
        Loading admin…
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1221] text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1221]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1221]/60">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-500/20 grid place-items-center text-blue-300">🎬</div>
            <h1 className="text-xl font-semibold">
              Cinema E-Booking <span className="text-white/60">/ Admin</span>
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-3 w-full max-w-xl">
            <input
              placeholder="Search users, movies, bookings…"
              className="flex-1 rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-blue-400/60 placeholder-white/50"
            />
            <button className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 hover:bg-white/15">+ Add Movie</button>
            <button className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 hover:bg-white/15">+ New Screening</button>
            <div className="ml-1 h-9 w-9 rounded-full bg-white/10 grid place-items-center">👤</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-8">
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-4">
              <div className="flex items-start justify-between">
                <div className="text-2xl">{k.icon}</div>
                <span className="text-xs text-white/60">{k.sub}</span>
              </div>
              <div className="mt-4 text-2xl font-semibold">{k.value}</div>
              <div className="text-sm text-white/70">{k.label}</div>
            </div>
          ))}
        </section>

        {/* Filters / toolbar */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-blue-400/60"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            <select
              value={theater}
              onChange={(e) => setTheater(e.target.value)}
              className="rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-blue-400/60"
            >
              <option>All</option>
              <option>Downtown</option>
              <option>Riverside</option>
              <option>Midtown</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-blue-400/60"
            >
              <option value="ALL">All statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 hover:bg-white/15">Export CSV</button>
              <button className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 hover:bg-white/15">Refresh</button>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent bookings */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-semibold">Recent Bookings</h2>
              <span className="text-xs text-white/60">{filtered.length} shown</span>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-white/70 border-t border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Movie</th>
                    <th className="px-4 py-2">Showtime</th>
                    <th className="px-4 py-2">Seats</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="px-4 py-2 font-medium">{b.id}</td>
                      <td className="px-4 py-2">{b.user}</td>
                      <td className="px-4 py-2">{b.movie}</td>
                      <td className="px-4 py-2">{b.showtime}</td>
                      <td className="px-4 py-2">{b.seats}</td>
                      <td className="px-4 py-2">${b.total.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <span className={badgeClass(b.status)}>{b.status}</span>
                      </td>
                      <td className="px-4 py-2">
                        <button className="rounded-md border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/15">View</button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-white/60">
                        No bookings match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column: Moderation & health */}
          <div className="space-y-6">
            {/* Moderation queue */}
            <div className="rounded-2xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">Moderation Queue</h2>
                <a className="text-sm text-blue-300 hover:text-blue-200" href="/admin/reports">View all</a>
              </div>
              <ul className="divide-y divide-white/10">
                {reports.map((r) => (
                  <li key={r.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{r.movie}</div>
                        <div className="text-sm text-white/70">by {r.user} • {r.submittedAt}</div>
                        <div className="mt-1 text-sm">{r.reason}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-md border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/15">Approve</button>
                        <button className="rounded-md border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/15">Reject</button>
                      </div>
                    </div>
                  </li>
                ))}
                {reports.length === 0 && (
                  <li className="p-6 text-center text-white/60">No reports pending 🎉</li>
                )}
              </ul>
            </div>

            {/* System health */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">System Health</h2>
                <span className="text-xs text-white/60">production</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-white/5 p-3">
                  <dt className="text-white/70">API uptime</dt>
                  <dd className="text-lg font-semibold">99.98%</dd>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <dt className="text-white/70">Error rate</dt>
                  <dd className="text-lg font-semibold">0.21%</dd>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <dt className="text-white/70">Queue length</dt>
                  <dd className="text-lg font-semibold">3</dd>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <dt className="text-white/70">Latest deploy</dt>
                  <dd className="text-lg font-semibold">Oct 24, 10:12 PM</dd>
                </div>
              </dl>
              <div className="mt-3 text-xs text-white/60">Last refresh: just now</div>
            </div>
          </div>
        </section>

        <div className="pt-2 text-xs text-white/50">
          Admin • Last updated just now • <a className="underline hover:text-white/70" href="/admin/settings">Settings</a>
        </div>
      </div>
    </main>
  );
}

function badgeClass(status: Booking["status"]) {
  const base = "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium";
  if (status === "CONFIRMED") return `${base} bg-emerald-400/15 text-emerald-300 border border-emerald-400/20`;
  if (status === "PENDING")   return `${base} bg-amber-400/15 text-amber-300 border border-amber-400/20`;
  return `${base} bg-rose-400/15 text-rose-300 border border-rose-400/20`;
}