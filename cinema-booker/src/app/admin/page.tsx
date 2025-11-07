// src/app/admin/page.tsx
"use client";

import { useEffect } from "react";
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

  // minimal client-side admin guard (keep middleware too)
  useEffect(() => {
    if (status !== "authenticated") return;
    const role =
      (session?.user as any)?.userType ??
      (session?.user as any)?.role ??
      "USER";
    if (role !== "ADMIN") router.replace("/");
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 grid place-items-center">
        Loading…
      </div>
    );
  }

  // TODO: replace with real data fetches
  const bookings: Booking[] = [
    {
      id: "B-9213",
      user: "sara@demo.com",
      movie: "Oppenheimer",
      showtime: "2025-10-26 18:30",
      seats: "E11,E12",
      total: 28.0,
      status: "CONFIRMED",
    },
    {
      id: "B-9212",
      user: "mike@demo.com",
      movie: "Interstellar",
      showtime: "2025-10-26 20:15",
      seats: "C7",
      total: 14.0,
      status: "PENDING",
    },
    {
      id: "B-9211",
      user: "nina@demo.com",
      movie: "La La Land",
      showtime: "2025-10-26 16:00",
      seats: "A1,A2,A3",
      total: 42.0,
      status: "CANCELLED",
    },
  ];

  const reports: ReviewReport[] = [
    {
      id: "R-1103",
      user: "alex@demo.com",
      movie: "Get Out",
      reason: "Inappropriate language",
      submittedAt: "2025-10-26 11:22",
    },
    {
      id: "R-1102",
      user: "lee@demo.com",
      movie: "Superbad",
      reason: "Spam / off-topic",
      submittedAt: "2025-10-26 09:44",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* header */}
      <div className="border-b border-neutral-800 bg-neutral-950/95 sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Admin</h1>
          <div className="text-sm text-neutral-400">
            {(session?.user as any)?.email}
          </div>
        </div>
      </div>

    <nav className="mx-auto max-w-6xl px-4 mt-4">
      <ul className="flex flex-wrap gap-3 text-sm">
        <li>
          <a
            href="/admin/movies"
            className="border border-neutral-700 rounded px-3 py-1.5 hover:bg-neutral-900 transition"
          >
            Manage Movies
          </a>
        </li>
        <li>
          <a
            href="/admin/promotions"
            className="border border-neutral-700 rounded px-3 py-1.5 hover:bg-neutral-900 transition"
          >
            Manage Promotions
          </a>
        </li>
        <li>
          <a
            href="/admin/users"
            className="border border-neutral-700 rounded px-3 py-1.5 hover:bg-neutral-900 transition"
          >
            Manage Users
          </a>
        </li>
        <li>
          <a
            href="/admin/showtimes"
            className="border border-neutral-700 rounded px-3 py-1.5 hover:bg-neutral-900 transition"
          >
            Manage Showtimes
          </a>

        </li>
        <li>
          <a
            href="/admin/scheduleShows"
            className="border border-neutral-700 rounded px-3 py-1.5 hover:bg-neutral-900 transition"
          >
            Schedule Movie Shows
          </a>
        </li>
      </ul>
    </nav>

      <div className="mx-auto max-w-6xl px-4 py-6 space-y-8">
        {/* bookings */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent bookings</h2>
            <button className="text-sm border border-neutral-700 px-3 py-1.5 rounded hover:bg-neutral-900">
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto border border-neutral-800 rounded">
            <table className="w-full text-sm">
              <thead className="bg-neutral-900 text-neutral-300">
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">User</th>
                  <th className="px-3 py-2 text-left">Movie</th>
                  <th className="px-3 py-2 text-left">Showtime</th>
                  <th className="px-3 py-2 text-left">Seats</th>
                  <th className="px-3 py-2 text-left">Total</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t border-neutral-800 hover:bg-neutral-900"
                  >
                    <td className="px-3 py-2 font-medium">{b.id}</td>
                    <td className="px-3 py-2">{b.user}</td>
                    <td className="px-3 py-2">{b.movie}</td>
                    <td className="px-3 py-2">{b.showtime}</td>
                    <td className="px-3 py-2">{b.seats}</td>
                    <td className="px-3 py-2">${b.total.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span className={statusBadge(b.status)}>{b.status}</span>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-3 py-10 text-center text-neutral-400"
                    >
                      No bookings to show.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* moderation */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Moderation queue</h2>
            <a
              href="/admin/reports"
              className="text-sm text-neutral-300 hover:underline"
            >
              View all
            </a>
          </div>

          <ul className="border border-neutral-800 rounded divide-y divide-neutral-800">
            {reports.map((r) => (
              <li key={r.id} className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{r.movie}</div>
                    <div className="text-xs text-neutral-400">
                      {r.user} • {r.submittedAt}
                    </div>
                    <div className="mt-1 text-sm">{r.reason}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="border border-neutral-700 px-3 py-1.5 rounded hover:bg-neutral-900">
                      Approve
                    </button>
                    <button className="border border-neutral-700 px-3 py-1.5 rounded hover:bg-neutral-900">
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {reports.length === 0 && (
              <li className="p-6 text-center text-neutral-400">
                No reports pending.
              </li>
            )}
          </ul>
        </section>

      </div>
    </main>
  );
}

function statusBadge(status: Booking["status"]) {
  const base =
    "inline-flex items-center rounded px-2 py-0.5 text-xs border";
  if (status === "CONFIRMED")
    return `${base} border-emerald-700 text-emerald-300`;
  if (status === "PENDING")
    return `${base} border-amber-700 text-amber-300`;
  return `${base} border-rose-700 text-rose-300`;
}