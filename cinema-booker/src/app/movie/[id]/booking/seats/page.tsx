"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

type Movie = {
  title: string;
  posterUrl?: string;
}

type BookingDetails = {
  adultTickets: number;
  childTickets: number;
  seniorTickets: number;
  showtime: string;
  showId?: string;
  date: string;
  auditorium: string;
}

type Show = {
  _id: string;
  movieID: string;
  showRoomID: string;
  movieTitle: string;
  showRoomName: string;
  time: number;
  date: string;
  seatReservationArray: string[];
}

type ShowRoom = {
  _id: string;
  roomName: string;
  seats: any[];
}

type Seat = {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  isSelected: boolean;
  type: 'standard' | 'premium' | 'occupied-by-other';
}

function SeatMapContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();

  // Get booking details from URL params
  const bookingDetails: BookingDetails = {
    adultTickets: parseInt(searchParams.get("adultTickets") || "0"),
    childTickets: parseInt(searchParams.get("childTickets") || "0"),
    seniorTickets: parseInt(searchParams.get("seniorTickets") || "0"),
    showtime: searchParams.get("showtime") || "",
    showId: searchParams.get("showId") || "",
    date: searchParams.get("date") || "",
    auditorium: searchParams.get("auditorium") || "",
  };

  const totalTickets = bookingDetails.adultTickets + bookingDetails.childTickets + bookingDetails.seniorTickets;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [show, setShow] = useState<Show | null>(null);
  const [showRoom, setShowRoom] = useState<ShowRoom | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch show and showroom data
  React.useEffect(() => {
    const fetchShowData = async () => {
      try {
        setLoading(true);
        console.log('Fetching show data for movie ID:', id);

        // Fetch shows for this movie
        const showResponse = await fetch(`/api/shows?movieId=${id}`);
        console.log('Show API response status:', showResponse.status);

        if (!showResponse.ok) {
          console.error('Show API failed:', showResponse.statusText);
          throw new Error(`Show API failed: ${showResponse.statusText}`);
        }

        const shows = await showResponse.json();
        console.log('Shows data:', shows);
        console.log('Looking for showId:', bookingDetails.showId);

        // Find the specific show by showId, or fall back to first show
        let currentShow;
        if (bookingDetails.showId) {
          currentShow = shows.find((show: Show) => show._id === bookingDetails.showId);
          console.log('Found show by ID:', currentShow);
        }

        // If no specific show found, fall back to first show
        if (!currentShow) {
          console.log('Using first available show as fallback');
          currentShow = shows[0];
        }

        if (!currentShow) {
          console.error('No show found for this movie');
          setLoading(false);
          return;
        }

        console.log('Current show:', currentShow);
        setShow(currentShow);

        // Fetch showroom data
        console.log('Fetching showroom data for ID:', currentShow.showRoomID);
        const roomResponse = await fetch(`/api/showRooms/${currentShow.showRoomID}`);
        console.log('Showroom API response status:', roomResponse.status);

        if (!roomResponse.ok) {
          console.error('Showroom API failed:', roomResponse.statusText);
          throw new Error(`Showroom API failed: ${roomResponse.statusText}`);
        }

        const roomData = await roomResponse.json();
        console.log('Showroom data:', roomData);
        console.log('Showroom name:', roomData.roomName);
        console.log('Seats array length:', roomData.seats ? roomData.seats.length : 'No seats array');
        setShowRoom(roomData);

        // Generate seats based on showroom capacity
        const totalSeats = roomData.seats.length;
        console.log('Total seats in showroom:', totalSeats);
        console.log('Checking if totalSeats === 56:', totalSeats === 56);
        console.log('Type of totalSeats:', typeof totalSeats);

        const reservedSeats = new Set(currentShow.seatReservationArray || []);
        console.log('Reserved seats:', reservedSeats);

        // Create proper widescreen auditorium layout for 56 seats
        const generatedSeats: Seat[] = [];

        if (totalSeats === 56) {
          console.log('Using 56-seat widescreen layout');
          // Widescreen auditorium layout: 8 rows with increasing seats from front to back
          const rowLayouts = [
            { row: 'A', seats: 6 },  // Front row: 6 seats
            { row: 'B', seats: 6 },  // 6 seats  
            { row: 'C', seats: 7 },  // 7 seats
            { row: 'D', seats: 7 },  // 7 seats
            { row: 'E', seats: 8 },  // 8 seats
            { row: 'F', seats: 8 },  // 8 seats
            { row: 'G', seats: 7 },  // 7 seats
            { row: 'H', seats: 7 }   // Back row: 7 seats
          ]; // Total: 6+6+7+7+8+8+7+7 = 56 seats

          rowLayouts.forEach(({ row, seats }) => {
            for (let seatNum = 1; seatNum <= seats; seatNum++) {
              const seatId = `${row}${seatNum}`;
              generatedSeats.push({
                id: seatId,
                row: row,
                number: seatNum,
                isOccupied: reservedSeats.has(seatId),
                isSelected: false,
                type: 'standard'
              });
            }
          });
        } else {
          // Fallback for other seat counts - use generic grid
          console.log('Using fallback generic grid layout for', totalSeats, 'seats');
          let seatsPerRow, numRows;

          if (totalSeats <= 20) {
            seatsPerRow = 4;
            numRows = Math.ceil(totalSeats / seatsPerRow);
          } else if (totalSeats <= 30) {
            seatsPerRow = 6;
            numRows = Math.ceil(totalSeats / seatsPerRow);
          } else if (totalSeats <= 40) {
            seatsPerRow = 8;
            numRows = Math.ceil(totalSeats / seatsPerRow);
          } else {
            seatsPerRow = 10;
            numRows = Math.ceil(totalSeats / seatsPerRow);
          }

          const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].slice(0, numRows);

          rows.forEach((row, rowIndex) => {
            const seatsInThisRow = rowIndex === rows.length - 1
              ? totalSeats - (rowIndex * seatsPerRow)
              : Math.min(seatsPerRow, totalSeats - (rowIndex * seatsPerRow));

            for (let seatNum = 1; seatNum <= seatsInThisRow; seatNum++) {
              const seatId = `${row}${seatNum}`;
              generatedSeats.push({
                id: seatId,
                row: row,
                number: seatNum,
                isOccupied: reservedSeats.has(seatId),
                isSelected: false,
                type: 'standard'
              });
            }
          });
        }

        console.log('Generated seats:', generatedSeats.length, 'seats');
        setSeats(generatedSeats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching show data:', error);
        // Fallback to default layout
        console.log('Using fallback seat layout');
        const defaultSeats: Seat[] = [];
        const rows = ['A', 'B', 'C', 'D', 'E'];

        rows.forEach(row => {
          for (let seatNum = 1; seatNum <= 5; seatNum++) {
            const seatId = `${row}${seatNum}`;
            defaultSeats.push({
              id: seatId,
              row: row,
              number: seatNum,
              isOccupied: false,
              isSelected: false,
              type: 'standard'
            });
          }
        });

        console.log('Fallback seats generated:', defaultSeats.length);
        setSeats(defaultSeats);
        setLoading(false);
      }
    };

    fetchShowData();
  }, [id, bookingDetails.showtime]);

  // Fetch movie information
  React.useEffect(() => {
    if (!id) return;
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  const handleSeatClick = (clickedSeat: Seat) => {
    if (clickedSeat.isOccupied) return;

    const isCurrentlySelected = selectedSeats.some(seat => seat.id === clickedSeat.id);

    if (isCurrentlySelected) {
      // Deselect seat
      setSelectedSeats(prev => prev.filter(seat => seat.id !== clickedSeat.id));
    } else {
      // Select seat (if under limit)
      if (selectedSeats.length < totalTickets) {
        setSelectedSeats(prev => [...prev, clickedSeat]);
      }
    }
  };

  const getSeatStyle = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);

    if (seat.isOccupied) {
      return {
        backgroundColor: '#374151', // Darker gray for occupied seats
        cursor: 'not-allowed',
        opacity: 0.8
      };
    }

    if (isSelected) {
      return {
        backgroundColor: '#10b981',
        cursor: 'pointer'
      };
    }

    return {
      backgroundColor: '#6b7280',
      cursor: 'pointer'
    };
  };

  const handleContinue = async () => {
    if (selectedSeats.length !== totalTickets) {
      alert(`Please select exactly ${totalTickets} seat(s)`);
      return;
    }

    if (!show) {
      alert('Show information is not available');
      return;
    }

    try {
      // Get the selected seat IDs
      const selectedSeatIds = selectedSeats.map(seat => seat.id);

      // Merge with existing reservations
      const updatedReservations = [...show.seatReservationArray, ...selectedSeatIds];

      // Update the show's seat reservations in the database
      const response = await fetch('/api/shows', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showId: show._id,
          seatReservationArray: updatedReservations
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update seat reservations');
      }

      const result = await response.json();

      // Show confirmation
      const seatNumbers = selectedSeatIds.join(', ');
      // alert(`Booking confirmed!\nSeats: ${seatNumbers}\nCustomer: ${bookingDetails.name}\nEmail: ${bookingDetails.email}`);

      // Redirect to checkout page
      // router.push('/');
      const params = new URLSearchParams({
        adultTickets: bookingDetails.adultTickets.toString(),
        childTickets: bookingDetails.childTickets.toString(),
        seniorTickets: bookingDetails.seniorTickets.toString(),
        showtime: bookingDetails.showtime,
        showId: bookingDetails.showId || "",
        date: bookingDetails.date || "",
        auditorium: bookingDetails.auditorium || "",
        selectedSeats: selectedSeatIds.join(",")
      });

      router.push(`/movie/${id}/booking/seats/checkout?${params.toString()}`);

    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Failed to confirm booking. Please try again.');
    }
  };

  if (!movie || loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e2e8f0"
      }}>
        Loading seat map...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#e2e8f0",
      padding: "16px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{
          padding: "20px 0",
          borderBottom: "1px solid #334155",
          marginBottom: "24px"
        }}>
          <h1 style={{ margin: 0, fontSize: "1.75rem" }}>Select Your Seats</h1>
          <p style={{ margin: "6px 0 0 0", color: "#94a3b8" }}>
            Choose {totalTickets} seat(s) for {movie.title}
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "32px" }}>
          {/* Seat Map */}
          <div>
            {/* Screen */}
            <div style={{
              background: "linear-gradient(to bottom, #475569, #334155)",
              height: "8px",
              borderRadius: "4px",
              marginBottom: "40px",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "14px",
                color: "#94a3b8"
              }}>
                SCREEN
              </div>
            </div>

            {/* Seats */}
            <div style={{ display: "grid", gap: "12px", justifyItems: "center" }}>
              {Array.from(new Set(seats.map(seat => seat.row))).map(row => {
                const rowSeats = seats.filter(seat => seat.row === row);
                const seatsInRow = rowSeats.length;

                return (
                  <div key={row} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "20px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#94a3b8"
                    }}>
                      {row}
                    </div>

                    <div style={{
                      display: "flex",
                      gap: "6px",
                      justifyContent: "center",
                      minWidth: "320px" // Ensure consistent width for alignment
                    }}>
                      {rowSeats.map(seat => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.isOccupied}
                          style={{
                            width: "44px",
                            height: "44px",
                            fontSize: "13px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "white",
                            ...getSeatStyle(seat)
                          }}
                          title={`Seat ${seat.id}`}
                        >
                          {seat.number}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{
              marginTop: "32px",
              display: "flex",
              gap: "24px",
              justifyContent: "center",
              fontSize: "14px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "#6b7280",
                  borderRadius: "4px"
                }}></div>
                <span>Available</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "#10b981",
                  borderRadius: "4px"
                }}></div>
                <span>Selected</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "#374151",
                  borderRadius: "4px",
                  opacity: 0.8
                }}></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div style={{
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "#1e293b"
            }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>
                Booking Summary
              </h3>

              <div style={{ display: "grid", gap: "8px", fontSize: "14px" }}>
                <div><strong>Movie:</strong> {movie.title}</div>
                <div><strong>Showtime:</strong> {bookingDetails.showtime}</div>
                <div><strong>Customer:</strong> {bookingDetails.name}</div>
                <div><strong>Email:</strong> {bookingDetails.email}</div>
                <hr style={{ border: "none", borderTop: "1px solid #334155", margin: "12px 0" }} />

                {bookingDetails.adultTickets > 0 && (
                  <div>Adult tickets: {bookingDetails.adultTickets}</div>
                )}
                {bookingDetails.childTickets > 0 && (
                  <div>Child tickets: {bookingDetails.childTickets}</div>
                )}
                {bookingDetails.seniorTickets > 0 && (
                  <div>Senior tickets: {bookingDetails.seniorTickets}</div>
                )}

                <div style={{ fontWeight: "600", marginTop: "8px" }}>
                  Total tickets: {totalTickets}
                </div>

                {selectedSeats.length > 0 && (
                  <>
                    <hr style={{ border: "none", borderTop: "1px solid #334155", margin: "12px 0" }} />
                    <div><strong>Selected Seats:</strong></div>
                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                      {selectedSeats.map(seat => seat.id).join(', ')}
                    </div>
                  </>
                )}
              </div>

              <div style={{
                marginTop: "24px",
                display: "flex",
                gap: "12px",
                flexDirection: "column"
              }}>
                <button
                  onClick={() => router.back()}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #475569",
                    backgroundColor: "#334155",
                    color: "#e2e8f0",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  Back to Details
                </button>

                <button
                  onClick={handleContinue}
                  disabled={selectedSeats.length !== totalTickets}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: selectedSeats.length === totalTickets ? "#10b981" : "#475569",
                    color: "white",
                    cursor: selectedSeats.length === totalTickets ? "pointer" : "not-allowed",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  {selectedSeats.length === totalTickets
                    ? "Confirm Booking"
                    : `Select ${totalTickets - selectedSeats.length} more seat(s)`
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeatMapPage() {
  return (
    <Suspense fallback={
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
    }>
      <SeatMapContent />
    </Suspense>
  );
}