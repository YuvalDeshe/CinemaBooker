"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useMoviePageController } from "@/controllers/MovieInfoController";
import styles from "@/app/movie/[id]/styles.module.css"
import PaymentCard from "@/models/PaymentCardModel";
import { PromoCode } from "@/models/PromoCodeModel";
import { Ticket } from "@/models/TicketModel";
import User from "@/models/UserModel";

import { bookingFacade } from "@/facades/BookingFacade";


export default function CheckoutPage() {
    const [user, setUser] = useState<User | any>(); // Using 'any' for User until full User model is defined
    const [selectedCard, setSelectedCard] = useState('');
    const [promo, setPromo] = useState('');
    const [promos, setPromos] = useState<PromoCode[]>([]);
    const [promoApplied, setPromoApplied] = useState<{ isApplied: boolean, multiplier: number }>({ isApplied: false, multiplier: 1 });
    const [promoMessage, setPromoMessage] = useState('');
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);


    const session = useSession();
    const c = useMoviePageController(useParams(), useSession());
    const searchParams = useSearchParams();
    const { id: movieId } = useParams();
    const router = useRouter();

    // --- Extracted Booking Data ---
    const adultTickets = Number.parseInt(searchParams.get("adultTickets") || "0");
    const childTickets = Number.parseInt(searchParams.get("childTickets") || "0");
    const seniorTickets = Number.parseInt(searchParams.get("seniorTickets") || "0");
    const showtime = searchParams.get("showtime") || "";
    const showId = searchParams.get("showId") || "";
    const date = searchParams.get("date") || "";
    const auditorium = searchParams.get("auditorium") || "";
    const selectedSeatsParam = searchParams.get("selectedSeats") || "";
    const selectedSeats = selectedSeatsParam.split(",").filter(s => s.trim().length > 0);
    const totalTickets = adultTickets + childTickets + seniorTickets;

    // --- Computed Data ---
    const adultTicket = tickets.find(t => t.ticketType === 'ADULT');
    const childTicket = tickets.find(t => t.ticketType === 'CHILD');
    const seniorTicket = tickets.find(t => t.ticketType === 'SENIOR');

    const adultPrice = adultTicket?.ticketPrice ?? 0;
    const childPrice = childTicket?.ticketPrice ?? 0;
    const seniorPrice = seniorTicket?.ticketPrice ?? 0;
    const initialOrderTotal = (childTickets * childPrice) + (adultTickets * adultPrice) + (seniorTickets * seniorPrice);

    const cardsList: PaymentCard[] = user?.paymentCard || [];
    const finalOrderTotal = Math.trunc((initialOrderTotal * promoApplied.multiplier) * 100) / 100;

    // --- Data Loading Effect (using Facade) ---
    useEffect(() => {
        async function loadData() {
            if (!session?.data?.user.id) return;

            // Facade calls replace the individual fetch functions
            const [u, p, t] = await Promise.all([
                bookingFacade.fetchUser(session.data.user.id),
                bookingFacade.fetchPromos(),
                bookingFacade.fetchTickets(),
            ]);

            setUser(u);
            setPromos(p);
            setTickets(t);
        }
        loadData();
    }, [session]);

    // --- Handlers ---
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCard(event.target.value);
    };

    const changePromo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPromo(event.target.value);
        setPromoMessage(''); // Clear message on input change
        setPromoApplied({ isApplied: false, multiplier: 1 }); // Reset discount
    }

    const applyPromo = () => {
        const validation = bookingFacade.validatePromo(promo, promos);
        setPromoMessage(validation.message);
        setPromoApplied({
            isApplied: validation.isValid && !!validation.promo,
            multiplier: validation.multiplier
        });
    }

    const handleConfirmAndPay = async (event: FormEvent) => {
        event.preventDefault(); // Prevent default form submission

        if (isProcessing || !user || !movieId || !showId) return;

        setIsProcessing(true);
        setPromoMessage('');

        try {
            const validation = bookingFacade.validatePromo(promo, promos);
            if (!validation.isValid && validation.message) {
                setPromoMessage(validation.message);
                setIsProcessing(false);
                return;
            }

            const formData = new FormData(event.currentTarget as HTMLFormElement);

            await bookingFacade.confirmAndPay(
                formData,
                user,
                selectedCard,
                cardsList,
                {
                    movieId: String(movieId),
                    showId,
                    promoCode: promo,
                    promo: validation.promo,
                    adultTickets, childTickets, seniorTickets,
                    adultPrice, childPrice, seniorPrice,
                    selectedSeats
                }
            );

            router.push('/');

        } catch (e: any) {
            console.error("Booking Error:", e);
            setPromoMessage(e.message || 'An unexpected error occurred during booking.');
        } finally {
            setIsProcessing(false);
        }
    }

    // --- Render ---
    if (c.loading || !c.movie) return <div className={styles.mainDiv}>Loading...</div>;

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#0f172a",
            padding: "24px",
            color: "white"
        }}>
            <form onSubmit={handleConfirmAndPay} style={{ maxWidth: 800, margin: "0 auto" }}>
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
                    {/* LEFT COLUMN (Summary & Payment) */}
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

                        <div>
                            <strong>Order total:</strong>
                            <div>{`Adult tickets: $${adultPrice} * ${adultTickets}`}</div>
                            <div>{`Child tickets: $${childPrice} * ${childTickets}`}</div>
                            <div className='mb-4'>{`Senior tickets: $${seniorPrice} * ${seniorTickets}`}</div>
                            <div>Promotion discount: {`${(1 - promoApplied.multiplier) * 100}%`}</div>
                            <div><strong>Final total: </strong>{`$${finalOrderTotal}`}</div>
                        </div>

                        <hr style={{ borderColor: "#334155" }} />

                        <label htmlFor="cardSelector"><strong>Select a payment card:</strong></label>
                        <select
                            defaultValue='default'
                            name="cardSelector"
                            className="bg-white text-black rounded-md p-1"
                            onChange={handleChange}
                            required
                        >
                            <option disabled hidden value='default'>Select a card</option>
                            {cardsList?.map((card: PaymentCard, index) =>
                                <option value={`${index}`} key={`${card.lastFour}`}
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
                            <input
                                type='text'
                                id='promo'
                                className='p-1 bg-white rounded-md text-black'
                                onChange={changePromo}
                                value={promo}
                            ></input>
                            <button
                                type="button" // Important: use type="button" to prevent form submission
                                className='m-2 bg-emerald-800 rounded-md p-2'
                                onClick={applyPromo}
                                disabled={isProcessing}
                            >
                                Apply Promo
                            </button>
                            {promoMessage !== '' && <div className={promoApplied.isApplied ? 'text-green-500' : 'text-red-500'}>{promoMessage}</div>}
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
                        type="button"
                        onClick={() => router.back()}
                        style={{
                            padding: "10px 16px",
                            background: "#334155",
                            borderRadius: 8,
                            border: "1px solid #475569",
                            cursor: "pointer"
                        }}
                        disabled={isProcessing}
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        style={{
                            padding: "10px 16px",
                            background: "#10b981",
                            borderRadius: 8,
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Confirm & Pay'}
                    </button>
                </div>
            </form>
        </div >
    );
}