"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMoviePageController } from "@/controllers/MovieInfoController";
import styles from "@/app/movie/[id]/styles.module.css"
import PaymentCard from "@/models/PaymentCardModel";
import BookingModel from "@/models/BookingModel";
import { PromoCode } from "@/models/PromoCodeModel";
import { Ticket } from "@/models/TicketModel";
import User from "@/models/UserModel";

async function fetchUser(userId: string) {
    try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchPromos() {
    try {
        const res = await fetch(`/api/promo`);
        if (!res.ok) throw new Error("Failed to fetch promos");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchTickets() {
    try {
        const res = await fetch(`/api/ticket`);
        if (!res.ok) throw new Error("Failed to fetch tickets");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}


export default function CheckoutPage() {
    const [user, setUser] = useState<any>();
    const [selectedCard, setSelectedCard] = useState('');
    const [promo, setPromo] = useState('');
    const [promos, setPromos] = useState<PromoCode[]>([]);
    const [promoApplied, setPromoApplied] = useState([false, 1]);
    const [promoMessage, setPromoMessage] = useState('');
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const session = useSession();
    const c = useMoviePageController(useParams(), useSession());
    const searchParams = useSearchParams();
    const { id } = useParams();
    const router = useRouter();

    // Extract booking data
    const adultTickets = Number.parseInt(searchParams.get("adultTickets") || "0");
    const childTickets = Number.parseInt(searchParams.get("childTickets") || "0");
    const seniorTickets = Number.parseInt(searchParams.get("seniorTickets") || "0");

    const showtime = searchParams.get("showtime") || "";
    const showId = searchParams.get("showId") || "";
    const date = searchParams.get("date") || "";
    const auditorium = searchParams.get("auditorium") || "";

    const adultTicket = tickets.find(t => t.ticketType === 'ADULT');
    const childTicket = tickets.find(t => t.ticketType === 'CHILD');
    const seniorTicket = tickets.find(t => t.ticketType === 'SENIOR');

    const adultPrice = adultTicket?.ticketPrice ?? 0;
    const childPrice = childTicket?.ticketPrice ?? 0;
    const seniorPrice = seniorTicket?.ticketPrice ?? 0;
    const orderTotal = (childTickets * childPrice) + (adultTickets * adultPrice) + (seniorTickets * seniorPrice);

    // Seats (comma separated from seats page)
    const selectedSeatsParam = searchParams.get("selectedSeats") || "";
    const selectedSeats = selectedSeatsParam.split(",").filter(s => s.trim().length > 0);

    const totalTickets = adultTickets + childTickets + seniorTickets;

    // API Call!!! Replace this when the facade is implemented!!!
    useEffect(() => {
        async function loadUser() {
            if (!session?.data?.user.id) return;
            const u = await fetchUser(session.data.user.id);
            setUser(u);
            console.log('user: ', user);
        }

        async function loadPromos() {
            const p = await fetchPromos();
            setPromos(p);
        }

        async function loadTickets() {
            const t = await fetchTickets();
            setTickets(t);
        }
        loadUser();
        loadPromos();
        loadTickets();
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

    console.log('promos: ', promos);

    const applyPromo = () => {
        const enteredPromoCode = promos.find(p => p.name.toUpperCase() === promo.toUpperCase());
        if (promo !== '' && enteredPromoCode === undefined) {
            setPromoMessage('Invalid promo code!');
            return;
        }
        const [endMonth, endDay, endYear] = enteredPromoCode?.endDate.split("/").map(Number) ?? [1, 1, 1];
        const endDate = new Date(endYear, endMonth - 1, endDay);
        const [startMonth, startDay, startYear] = enteredPromoCode?.startDate.split('/').map(Number) ?? [1, 1, 1];
        const startDate = new Date(startYear, startMonth - 1, startDay);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        if (startDate > currentDate || endDate < currentDate) {
            setPromoMessage('The entered promo code is inactive.');
            return;
        }

        const promoMultiplier = enteredPromoCode?.priceMultiplier ?? 1;
        if (enteredPromoCode) setPromoApplied([true, promoMultiplier]);
    }

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

                        <div><strong>Order total:</strong></div>
                        <div>
                            <div>{`Adult tickets: $${adultPrice} * ${adultTickets}`}</div>
                            <div>{`Child tickets: $${childPrice} * ${childTickets}`}</div>
                            <div className='mb-4'>{`Senior tickets: $${seniorPrice} * ${seniorTickets}`}</div>
                            <div>Promotion discount: {`${(1 - Number(promoApplied[1])) * 100}%`}</div>
                            <div><strong>Order total: </strong>{`$${Math.trunc((orderTotal * Number(promoApplied[1])) * 100) / 100}`}</div>
                        </div>

                        <hr style={{ borderColor: "#334155" }} />

                        <label htmlFor="cardSelector"><strong>Select a payment card:</strong></label>
                        <select defaultValue='default' name="cardSelector" className="bg-white text-black rounded-md p-1" onChange={handleChange}>
                            <option disabled hidden value='default'>Select a card</option>
                            {cardsList?.map((card: PaymentCard) =>
                                <option value={`${cardsList.indexOf(card)}`} key={`${card.lastFour}`}
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
                            <button className='m-2 bg-emerald-800 rounded-md p-2' onClick={applyPromo}>Apply Promo</button>
                            {promoMessage !== '' && <div className='text-red-500'>{`${promoMessage}`}</div>}

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
                        onClick={async () => {
                            try {
                                const enteredPromoCode = promos.find(p => p.name.toUpperCase() === promo.toUpperCase());
                                if (promo !== '' && enteredPromoCode === undefined) {
                                    throw new Error('Invalid promo code!');
                                }

                                const promoMultiplier = enteredPromoCode?.priceMultiplier ?? 1;
                                if (enteredPromoCode) setPromoApplied([true, promoMultiplier]);
                                const orderTotal = ((childTickets * childPrice) + (adultTickets * adultPrice) + (seniorTickets * seniorPrice)) * promoMultiplier;

                                const promoID = enteredPromoCode?._id ?? '';
                                const userID: string = user._id || '';
                                const date = String(new Date());

                                if (adultPrice == 0 || childPrice == 0 || seniorPrice == 0) {
                                    throw new Error('Invalid ticket price. Were tickets fetched correctly?');
                                }


                                const ticketCount = {
                                    child: childTickets,
                                    adult: adultTickets,
                                    senior: seniorTickets
                                }

                                let cardLastFour = '';
                                if (selectedCard === '') {
                                    throw new Error('No card selected');
                                } else if (selectedCard === 'new-card') {
                                    /* TODO: 
                                    - create a new card and save it to the user in the DB
                                    - store its lastFour in cardLastFour (will be sent to Booking DB)
                                    - use the imported PaymentCard class
                                    - change newCard to store this data
                                    */
                                    const cardNumberInput = document.getElementById("cardNumber") as HTMLInputElement | null;
                                    const expMonthInput = document.getElementById("expMonth") as HTMLInputElement | null;
                                    const expYearInput = document.getElementById("expYear") as HTMLInputElement | null;
                                    const cardTypeInput = document.querySelector('input[name="cardType"]:checked') as HTMLInputElement | null;

                                    if (!cardNumberInput || !expMonthInput || !expYearInput || !cardTypeInput) {
                                        throw new Error("Please fill in all card details.");
                                    }

                                    // Normalize and validate card number
                                    const rawCardNumber = cardNumberInput.value.replace(/\s+/g, "");
                                    if (rawCardNumber.length < 4) {
                                        throw new Error("Card number is invalid.");
                                    }

                                    const lastFour = rawCardNumber.slice(-4);
                                    cardLastFour = lastFour;

                                    // Create a new PaymentCard instance
                                    const newCard = new PaymentCard({
                                        cardType: cardTypeInput.value,
                                        cardNumber: rawCardNumber,
                                        expMonth: expMonthInput.value,
                                        expYear: expYearInput.value,
                                        lastFour,
                                        isNew: true,
                                        _tempId: crypto.randomUUID(),
                                    });
                                    const newCardsList = [...user.paymentCard, newCard];
                                    const userUpdateData = {
                                        _id: user._id,
                                        paymentCard: newCardsList
                                    }

                                    // update the user in the DB
                                    const res = await fetch(`/api/users/${user._id}`, {
                                        method: "PATCH",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(userUpdateData),
                                    });
                                    if (!res.ok) throw new Error("Failed to update profile");

                                } else {
                                    const c = cardsList[Number(selectedCard)]
                                    cardLastFour = c.lastFour;
                                }

                                const bookingData = {
                                    movieID: String(id),
                                    promoCode: promo ?? '',
                                    promoCodeID: promoID,
                                    showID: showId,
                                    userID: userID,
                                    paymentCardUsed: cardLastFour,
                                    bookingDate: date,
                                    orderTotal: orderTotal,
                                    seats: selectedSeats,
                                    tickets: ticketCount
                                }
                                console.log('bookingData: ', bookingData);
                                const booking = new BookingModel(bookingData)
                                console.log('booking: ', booking);
                                try {
                                    const showResponse = await fetch(`/api/shows?movieId=${id}`);
                                    if (!showResponse.ok) {
                                        throw new Error('Failed to fetch show data for seat update');
                                    }

                                    const shows: any[] = await showResponse.json();
                                    const currentShow = shows.find((s: any) => s._id === showId);

                                    if (!currentShow) {
                                        throw new Error('Show not found when updating seat reservations');
                                    }

                                    const existingReservations: string[] = currentShow.seatReservationArray || [];
                                    const selectedSeatIds = selectedSeats; // already an array of strings like ["A3", "A4", ...]
                                    const updatedReservations = [...existingReservations, ...selectedSeatIds];

                                    const seatUpdateRes = await fetch('/api/shows', {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            showId: showId,
                                            seatReservationArray: updatedReservations,
                                        }),
                                    });
                                    if (!seatUpdateRes.ok) {
                                        throw new Error('Failed to update seat reservations');
                                    }
                                } catch (seatError) {
                                    console.error('Error updating seat reservations after booking:', seatError);

                                }

                                // add the booking to the db
                                console.log("Attempting to add booking with payload:", bookingData);

                                const response = await fetch('/api/booking', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(bookingData),
                                });

                                const data = await response.json();

                                if (response.ok) {
                                    console.log("Registration successful!", data);
                                } else {
                                    console.error("Registration failed:", data.message);
                                    throw new Error(data.message || "Registration failed due to an unknown error.");
                                }

                                router.push('/');

                            }
                        catch (e) {
                            console.error(e);
                        return null;
                            }
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
        </div >
    );
}
