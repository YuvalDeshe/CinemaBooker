"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { userAgent } from "next/server";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMoviePageController } from "@/controllers/MovieInfoController";
import styles from "@/app/movie/[id]/styles.module.css"
import PaymentCard from "@/models/PaymentCardModel";
import BookingModel from "@/models/BookingModel";

async function fetchUser(userId: string) {
    try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export default function CheckoutPage() {
    const [user, setUser] = useState()
    const [selectedCard, setSelectedCard] = useState('');
    const [promo, setPromo] = useState('');
    const session = useSession();
    console.log('session: ', session);
    const c = useMoviePageController(useParams(), useSession());
    const searchParams = useSearchParams();
    const { id } = useParams();
    const router = useRouter();

    // Extract booking data from URL
    const adultTickets = Number.parseInt(searchParams.get("adultTickets") || "0");
    const childTickets = Number.parseInt(searchParams.get("childTickets") || "0");
    const seniorTickets = Number.parseInt(searchParams.get("seniorTickets") || "0");

    const showtime = searchParams.get("showtime") || "";
    const showId = searchParams.get("showId") || "";
    const date = searchParams.get("date") || "";
    const auditorium = searchParams.get("auditorium") || "";

    // Seats (comma separated from seats page)
    const selectedSeatsParam = searchParams.get("selectedSeats") || "";
    const selectedSeats = selectedSeatsParam.split(",").filter(s => s.trim().length > 0);

    const totalTickets = adultTickets + childTickets + seniorTickets;

    // API Calls!!! Replace these when the facade is implemented!!!
    useEffect(() => {
        async function loadUser() {
            if (!session?.data?.user.id) return;
            const u = await fetchUser(session.data.user.id);
            setUser(u);
        }
        loadUser();
    }, [session]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCard(event.target.value);
    };
    const changePromo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPromo(event.target.value);
        console.log(promo);
    }


    console.log('user: ', user);
    const cardsList: PaymentCard[] = user?.paymentCard || [];
    // make an api call for promos here

    if (c.loading || !c.movie) return <div className={styles.mainDiv}>Loading...</div>;
    else return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#0f172a",
            padding: "24px",
            color: "white"
        }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <h1 style={{ fontSize: "1.8rem", marginBottom: 20 }}>
                    Checkout
                </h1>

                <p style={{ opacity: 0.8, marginBottom: 24 }}>
                    Review your booking before payment.
                </p>

                <div
                    style={{
                        background: "#1e293b",
                        padding: 20,
                        borderRadius: 12,
                        border: "1px solid #334155",
                        display: "flex",
                        gap: 20,
                    }}
                >
                    {/* LEFT COLUMN */}
                    <div style={{ flex: 1, display: "grid", gap: 12 }}>
                        <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Booking Summary</h2>

                        <div><strong>User:</strong> {session?.data?.user.email}</div>
                        <div><strong>Movie:</strong> {c.movie.title}</div>
                        <div><strong>Showtime:</strong> {date} at {showtime}</div>
                        <div><strong>Auditorium:</strong> {auditorium}</div>

                        <hr style={{ borderColor: "#334155" }} />

                        <div><strong>Total Tickets:</strong> {totalTickets}</div>
                        <div><strong>Adult Tickets:</strong> {adultTickets}</div>
                        <div><strong>Child Tickets:</strong> {childTickets}</div>
                        <div><strong>Senior Tickets:</strong> {seniorTickets}</div>

                        <hr style={{ borderColor: "#334155" }} />

                        <div><strong>Selected Seats:</strong></div>
                        <div>
                            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                        </div>

                        <hr style={{ borderColor: "#334155" }} />

                        <label htmlFor="cardSelector"><strong>Select a payment card:</strong></label>
                        <select defaultValue='default' name="cardSelector" className="bg-white text-black rounded-md p-1" onChange={handleChange}>
                            <option disabled hidden value='default'>Select a card</option>
                            {cardsList?.map((card: PaymentCard) =>
                                <option value={`card${cardsList.indexOf(card) + 1}`} key={`${card.lastFour}`}
                                    className="text-black">●●●● ●●●● ●●●● {card.lastFour}</option>
                            )}
                            {cardsList?.length < 3 ?
                                (
                                    <option value='new-card' key='new-card'>New card</option>
                                ) : null}
                        </select>

                        {selectedCard === 'new-card' && (
                            <div className="rounded-xl border border-gray-700/60 bg-[#22283b]/50 p-4">
                                <div className="flex gap-6 flex-wrap">
                                    <label className="inline-flex items-center gap-2 text-gray-200">
                                        <input type="radio" required name="cardType" value="debit" className="h-4 w-4" />
                                        Debit
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-gray-200">
                                        <input type="radio" required name="cardType" value="credit" className="h-4 w-4" />
                                        Credit
                                    </label>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <label htmlFor="cardNumber" className="block mb-1 text-gray-300">Card number</label>
                                        <input
                                            id="cardNumber" name="cardNumber" required type="text"
                                            className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="4242 4242 4242 4242"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expMonth" className="block mb-1 text-gray-300">Exp. month</label>
                                        <input
                                            id="expMonth" name="expMonth" required type="text"
                                            className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="MM"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expYear" className="block mb-1 text-gray-300">Exp. year</label>
                                        <input
                                            id="expYear" name="expYear" required type="text"
                                            className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="YYYY"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    
                    <div>
                        Enter a promo code:
                        <br></br>
                        <input type='text' id='promo' className='p-1 bg-white rounded-md text-black' onChange={changePromo}></input>

                    </div>
                    </div>

                    {/* RIGHT COLUMN — MOVIE POSTER */}
                    <div
                        style={{
                            width: 180,
                            minWidth: 180,
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={c.movie.png || "/fallback.jpg"}
                            alt={c.movie.title}
                            style={{
                                width: "100%",
                                borderRadius: 8,
                                objectFit: "cover",
                                border: "1px solid #475569",
                            }}
                        />
                    </div>
                </div>


                <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                    <button
                        onClick={() => router.back()}
                        style={{
                            padding: "10px 16px",
                            background: "#334155",
                            borderRadius: 8,
                            border: "1px solid #475569",
                            cursor: "pointer"
                        }}
                    >
                        Back
                    </button>

                    <button
                        onClick={() => { 
                            // api call to confirm the entered promo code is valid
                            const promoID = 'change this value!';
                            const userID: string = user.id || '';
                            const date = String(new Date());
                            // api call to get ticket prices from the database
                            // prices are in TicketDatabase/TicketCollection
                            // change these values based on DB response!
                            const adultPrice = 10;
                            const childPrice = 10;
                            const seniorPrice = 10;
                            const orderTotal = (childTickets * childPrice) + (adultTickets * adultPrice) + (seniorTickets * seniorPrice);

                            const tickets = {
                                child: childTickets,
                                adult: adultTickets,
                                senior: seniorTickets
                            }

                            const bookingData = {
                                movieID: String(id), 
                                promoCode: promo, 
                                promoCodeID: promoID, 
                                showID: showId, 
                                userID: userID, 
                                bookingDate: date, 
                                orderTotal: orderTotal, 
                                seats: selectedSeats, 
                                tickets: tickets
                            }
                            console.log('bookingData: ', bookingData);
                            const booking = new BookingModel(bookingData)
                            /* TODO:
                            - add api calls specified above
                            - create a new Booking in the DB with the booking object
                            - if that succeeds, update the reserved seats for the show in the DB
                                - there is code in movie/[id]/booking/seats that does that; you can steal it and put it here
                                - make sure you remove it from there when you add it here
                            - if everything was successful & user selected to enter new card, add it to the DB
                            - show a confirmation page after booking is complete
                            - send a confirmation email
                            */
                            console.log('booking: ', booking);
                            router.push('/');

                        }}
                        style={{
                            padding: "10px 16px",
                            background: "#10b981",
                            borderRadius: 8,
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                    >
                        Confirm & Pay
                    </button>
                </div>
            </div>
        </div>
    );
}
