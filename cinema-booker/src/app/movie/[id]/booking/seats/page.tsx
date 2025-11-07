"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

type Movie = {
  title: string;
  posterUrl?: string;
}

type BookingDetails = {
  name: string;
  email: string;
  adultTickets: number;
  childTickets: number;
  seniorTickets: number;
  showtime: string;
  showId?: string;
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
  type: 'standard' | 'premium';
}

function SeatMapContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  
  // Get booking details from URL params
  const bookingDetails: BookingDetails = {
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    adultTickets: parseInt(searchParams.get("adultTickets") || "0"),
    childTickets: parseInt(searchParams.get("childTickets") || "0"),
    seniorTickets: parseInt(searchParams.get("seniorTickets") || "0"),
    showtime: searchParams.get("showtime") || ""
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
        
        // For now, take the first show that matches
        // In a real app, you'd match by exact time/date
        const currentShow = shows[0];
        
        if (!currentShow) {
          console.error('No show found for this movie');
          setLoading(false);
          return;
        }
        
        console.log('Current show:', currentShow);
        setShow(currentShow);
        
        // Fetch showroom data
        console.log('Fetching showroom data for ID:', currentShow.showRoomID);
        const roomResponse = await fetch(`/api/showrooms/${currentShow.showRoomID}`);
        console.log('Showroom API response status:', roomResponse.status);
        
        if (!roomResponse.ok) {
          console.error('Showroom API failed:', roomResponse.statusText);
          throw new Error(`Showroom API failed: ${roomResponse.statusText}`);
        }
        
        const roomData = await roomResponse.json();
        console.log('Showroom data:', roomData);
        setShowRoom(roomData);
        
        // Generate seats based on showroom capacity
        const totalSeats = roomData.seats.length;
        console.log('Total seats in showroom:', totalSeats);
        
        const reservedSeats = new Set(currentShow.seatReservationArray || []);
        console.log('Reserved seats:', reservedSeats);
        
        // Calculate grid layout based on total seats
        let seatsPerRow, numRows;
        
        if (totalSeats <= 20) {
          seatsPerRow = 4; // 4x5 or 5x4
          numRows = Math.ceil(totalSeats / seatsPerRow);
        } else if (totalSeats <= 30) {
          seatsPerRow = 6; // 5x6 or 6x5
          numRows = Math.ceil(totalSeats / seatsPerRow);
        } else if (totalSeats <= 40) {
          seatsPerRow = 8; // 6x8 or similar
          numRows = Math.ceil(totalSeats / seatsPerRow);
        } else {
          seatsPerRow = 10; // Larger auditoriums
          numRows = Math.ceil(totalSeats / seatsPerRow);
        }
        
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].slice(0, numRows);
        
        const generatedSeats: Seat[] = [];
        
        rows.forEach((row, rowIndex) => {
          const seatsInThisRow = rowIndex === rows.length - 1 
            ? totalSeats - (rowIndex * seatsPerRow) // Last row might have fewer seats
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
        backgroundColor: '#ef4444',
        cursor: 'not-allowed',
        opacity: 0.7
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

  const handleContinue = () => {
    if (selectedSeats.length !== totalTickets) {
      alert(`Please select exactly ${totalTickets} seat(s)`);
      return;
    }

    // For now, show confirmation
    const seatNumbers = selectedSeats.map(seat => seat.id).join(', ');
    alert(`Booking confirmed!\nSeats: ${seatNumbers}\nCustomer: ${bookingDetails.name}\nEmail: ${bookingDetails.email}`);
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
              {Array.from(new Set(seats.map(seat => seat.row))).map(row => (
                <div key={row} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ 
                    width: "20px", 
                    fontSize: "14px", 
                    fontWeight: "600",
                    color: "#94a3b8" 
                  }}>
                    {row}
                  </div>
                  
                  <div style={{ display: "flex", gap: "6px" }}>
                    {seats
                      .filter(seat => seat.row === row)
                      .map(seat => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.isOccupied}
                          style={{
                            width: "32px",
                            height: "32px",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "10px",
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
              ))}
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