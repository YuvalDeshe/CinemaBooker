"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BookingConfirmation = {
  bookingId: string;
  movieTitle: string;
  showtime: string;
  date: string;
  auditorium: string;
  seats: string[];
  adultTickets: number;
  childTickets: number;
  seniorTickets: number;
  orderTotal: number;
  userEmail: string;
  promoCode?: string;
  bookingDate: string;
};

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id: movieId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any>(null);

  // Extract booking details from URL params
  const bookingId = searchParams.get("bookingId") || "";
  const movieTitle = searchParams.get("movieTitle") || "";
  const showtime = searchParams.get("showtime") || "";
  const date = searchParams.get("date") || "";
  const auditorium = searchParams.get("auditorium") || "";
  const seatsParam = searchParams.get("seats") || "";
  const seats = seatsParam.split(",").filter(s => s.trim().length > 0);
  const adultTickets = parseInt(searchParams.get("adultTickets") || "0");
  const childTickets = parseInt(searchParams.get("childTickets") || "0");
  const seniorTickets = parseInt(searchParams.get("seniorTickets") || "0");
  const orderTotal = parseFloat(searchParams.get("orderTotal") || "0");
  const userEmail = searchParams.get("userEmail") || "";
  const promoCode = searchParams.get("promoCode") || "";
  const bookingDate = searchParams.get("bookingDate") || "";

  const totalTickets = adultTickets + childTickets + seniorTickets;

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      try {
        const res = await fetch(`/api/movies/${movieId}`);
        if (res.ok) {
          const data = await res.json();
          setMovie(data);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e2e8f0"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#e2e8f0",
      padding: "24px"
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Success Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "40px"
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            margin: "0 0 12px 0",
            color: "#10b981"
          }}>
            Booking Confirmed!
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "#94a3b8",
            margin: 0
          }}>
            Your tickets have been successfully booked
          </p>
        </div>

        {/* Main Content Card */}
        <div style={{
          backgroundColor: "#1e293b",
          borderRadius: "16px",
          padding: "32px",
          border: "1px solid #334155",
          marginBottom: "24px"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: movie?.png ? "1fr 200px" : "1fr",
            gap: "32px"
          }}>
            {/* Left Column - Booking Details */}
            <div>
              <h2 style={{
                fontSize: "1.5rem",
                margin: "0 0 24px 0",
                paddingBottom: "16px",
                borderBottom: "2px solid #334155"
              }}>
                Booking Details
              </h2>

              <div style={{ display: "grid", gap: "16px" }}>
                {/* Booking ID */}
                <div style={{
                  backgroundColor: "#0f172a",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #334155"
                }}>
                  <div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "4px" }}>
                    Booking ID
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "600", fontFamily: "monospace" }}>
                    {bookingId}
                  </div>
                </div>

                {/* Email Confirmation */}
                <div style={{
                  backgroundColor: "#064e3b",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #059669",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <div style={{ fontSize: "14px", color: "#d1fae5" }}>
                    Confirmation email sent to <strong>{userEmail}</strong>
                  </div>
                </div>

                {/* Movie Information */}
                <div>
                  <h3 style={{ fontSize: "1.2rem", margin: "24px 0 12px 0", color: "#cbd5e1" }}>
                    Movie Information
                  </h3>
                  <div style={{ display: "grid", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#94a3b8" }}>Movie:</span>
                      <span style={{ fontWeight: "600" }}>{movieTitle}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#94a3b8" }}>Date:</span>
                      <span style={{ fontWeight: "600" }}>{date}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#94a3b8" }}>Showtime:</span>
                      <span style={{ fontWeight: "600" }}>{showtime}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#94a3b8" }}>Auditorium:</span>
                      <span style={{ fontWeight: "600" }}>{auditorium}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Information */}
                <div>
                  <h3 style={{ fontSize: "1.2rem", margin: "24px 0 12px 0", color: "#cbd5e1" }}>
                    Ticket Information
                  </h3>
                  <div style={{ display: "grid", gap: "12px" }}>
                    {adultTickets > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Adult Tickets:</span>
                        <span style={{ fontWeight: "600" }}>{adultTickets}</span>
                      </div>
                    )}
                    {childTickets > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Child Tickets:</span>
                        <span style={{ fontWeight: "600" }}>{childTickets}</span>
                      </div>
                    )}
                    {seniorTickets > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Senior Tickets:</span>
                        <span style={{ fontWeight: "600" }}>{seniorTickets}</span>
                      </div>
                    )}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "12px",
                      borderTop: "1px solid #334155"
                    }}>
                      <span style={{ color: "#94a3b8" }}>Total Tickets:</span>
                      <span style={{ fontWeight: "600" }}>{totalTickets}</span>
                    </div>
                  </div>
                </div>

                {/* Seat Information */}
                <div>
                  <h3 style={{ fontSize: "1.2rem", margin: "24px 0 12px 0", color: "#cbd5e1" }}>
                    Your Seats
                  </h3>
                  <div style={{
                    backgroundColor: "#0f172a",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #334155"
                  }}>
                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px"
                    }}>
                      {seats.map((seat, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: "#10b981",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            fontWeight: "600",
                            fontSize: "14px"
                          }}
                        >
                          {seat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 style={{ fontSize: "1.2rem", margin: "24px 0 12px 0", color: "#cbd5e1" }}>
                    Payment Summary
                  </h3>
                  <div style={{
                    backgroundColor: "#0f172a",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #334155"
                  }}>
                    {promoCode && (
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                        paddingBottom: "12px",
                        borderBottom: "1px solid #334155"
                      }}>
                        <span style={{ color: "#94a3b8" }}>Promo Code Applied:</span>
                        <span style={{ fontWeight: "600", color: "#10b981" }}>{promoCode}</span>
                      </div>
                    )}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.3rem"
                    }}>
                      <span style={{ fontWeight: "600" }}>Total Paid:</span>
                      <span style={{ fontWeight: "bold", color: "#10b981" }}>
                        ${orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Date */}
                <div style={{
                  fontSize: "13px",
                  color: "#64748b",
                  marginTop: "8px"
                }}>
                  Booked on: {new Date(bookingDate).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Right Column - Movie Poster */}
            {movie?.png && (
              <div>
                <img
                  src={movie.png}
                  alt={movieTitle}
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    border: "1px solid #334155",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "14px 32px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#059669"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#10b981"}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
