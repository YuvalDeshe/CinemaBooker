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


<section className="mx-auto max-w-6xl px-4 mt-8 grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
        <h2 className="text-base font-semibold mb-2">Manage promo codes</h2>
        <p className="text-sm text-neutral-400 mb-4">
          Create and update promo codes that can be applied at checkout.
        </p>
        <a
          href="/admin/addpromo"
          className="inline-flex items-center rounded-md border border-emerald-500 px-3 py-1.5 text-sm font-medium hover:bg-emerald-500/10"
        >
          Add promotion
        </a>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
        <h2 className="text-base font-semibold mb-2">Send promotion emails</h2>
        <p className="text-sm text-neutral-400 mb-4">
          Email active promo codes to users who opted in to marketing.
        </p>
        <a
          href="/admin/send-promo"
          className="inline-flex items-center rounded-md border border-sky-500 px-3 py-1.5 text-sm font-medium hover:bg-sky-500/10"
        >
          Send Promotional Email
        </a>
      </div>


      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
        <h2 className="text-base font-semibold mb-2">Add New Movie</h2>
        <p className="text-sm text-neutral-400 mb-4">
           Add a new movie title, description, cast, poster, and details.
        </p>
        <a
          href="/admin/addmovie"
          className="inline-flex items-center rounded-md border border-sky-500 px-3 py-1.5 text-sm font-medium hover:bg-sky-500/10"
        >
          Add Movie
        </a>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
        <h2 className="text-base font-semibold mb-2">Schedule Movie Shows</h2>
        <p className="text-sm text-neutral-400 mb-4">
          Manage showtimes, assign auditoriums, and schedule upcoming screenings.
        </p>
        <a
          href="/admin/scheduleShows"
          className="inline-flex items-center rounded-md border border-emerald-500 px-3 py-1.5 text-sm font-medium hover:bg-sky-500/10"
        >
          Schedule Movie Shows
        </a>
      </div>
      






    </section>
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