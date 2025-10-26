"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Accept either a plain label or an ISO datetime
  const label = searchParams.get("time");
  const timeIso = searchParams.get("timeIso");

  const formatIso = (iso?: string | null) => {
    if (!iso) return null;
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  const chosenTime = label || formatIso(timeIso) || "TBD";

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adultTickets, setAdultTickets] = useState(1);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [agree, setAgree] = useState(false);

  const isValid =
    name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && (adultTickets + childTickets + seniorTickets > 0) && agree;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      {/* Header */}
      <header
        style={{
          padding: "20px 0",
          borderBottom: "1px solid #374151",
          color: "#e5e7eb",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.75rem" }}>Booking</h1>
        <p style={{ margin: "6px 0 0 0", color: "#9ca3af" }}>
          Confirm your details to continue
        </p>
      </header>

      <main style={{ display: "grid", gap: 16, marginTop: 16 }}>
        {/* Summary card */}
        <section
          style={{
            border: "1px solid #374151",
            borderRadius: 12,
            padding: 16,
            background: "#1f2937",
            color: "#f9fafb",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              aria-hidden
              style={{
                width: 120,
                height: 168,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(62,161,255,.25), rgba(124,77,255,.25))",
                border: "1px solid #374151",
              }}
            />
            <div style={{ display: "grid", gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem" }}>
                Example Movie Title
              </h2>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ width: 110, color: "#9ca3af" }}>Showtime</span>
                <span style={{ fontWeight: 600 }}>{chosenTime}</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ width: 110, color: "#9ca3af" }}>Auditorium</span>
                <span style={{ fontWeight: 600 }}>3</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form card */}
        <section
          style={{
            border: "1px solid #374151",
            borderRadius: 12,
            padding: 16,
            background: "#1f2937",
            color: "#f9fafb",
          }}
        >
          <h3 style={{ margin: "0 0 12px 0", fontSize: "1.1rem" }}>
            Your Details
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Prototype: booking submitted (no backend)!");
            }}
            style={{ display: "grid", gap: 12 }}
          >
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              }}
            >
              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="name" style={{ fontWeight: 600 }}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    background: "#111827",
                    color: "#f9fafb",
                    border: "1px solid #4b5563",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="email" style={{ fontWeight: 600 }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: "#111827",
                    color: "#f9fafb",
                    border: "1px solid #4b5563",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="tickets" style={{ fontWeight: 600 }}>
                  Child Tickets
                </label>
                <input
                  id="tickets"
                  type="number"
                  min={0}
                  max={10}
                  value={childTickets}
                  onChange={(e) => setChildTickets(Number(e.target.value || 1))}
                  style={{
                    background: "#111827",
                    color: "#f9fafb",
                    border: "1px solid #4b5563",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                />
                <small style={{ color: "#9ca3af" }}>
                  Max 10 for this prototype.
                </small>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="tickets" style={{ fontWeight: 600 }}>
                  Adult Tickets
                </label>
                <input
                  id="tickets"
                  type="number"
                  min={0}
                  max={10}
                  value={adultTickets}
                  onChange={(e) => setAdultTickets(Number(e.target.value || 1))}
                  style={{
                    background: "#111827",
                    color: "#f9fafb",
                    border: "1px solid #4b5563",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                />
                <small style={{ color: "#9ca3af" }}>
                  Max 10 for this prototype.
                </small>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="tickets" style={{ fontWeight: 600 }}>
                  Senior Tickets
                </label>
                <input
                  id="tickets"
                  type="number"
                  min={0}
                  max={10}
                  value={seniorTickets}
                  onChange={(e) => setSeniorTickets(Number(e.target.value || 1))}
                  style={{
                    background: "#111827",
                    color: "#f9fafb",
                    border: "1px solid #4b5563",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                />
                <small style={{ color: "#9ca3af" }}>
                  Max 10 for this prototype.
                </small>
              </div>

              <div style={{ display: "grid", gap: 6, alignContent: "end", marginBottom: 25 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    background: "#111827",
                    border: "1px solid #4b5563",
                    borderRadius: 8,
                  }}
                >
                  <input 
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>I agree to the booking terms</span>
                </label>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                marginTop: 8,
              }}
            >
              <button
                type="button"
                onClick={() => router.push("/movie/MOVIE_ID")}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #4b5563",
                  background: "#374151",
                  color: "#f9fafb",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Back
              </button>

              <button
                type="submit"
                disabled={!isValid}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: isValid ? "#2563eb" : "#6b7280",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: isValid ? "pointer" : "not-allowed",
                }}
              >
                Continue
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}