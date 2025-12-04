"use client";

import React, { FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";           
import { useSession } from "next-auth/react";
import { useMoviePageModel } from "@/models/MovieInfoModel";
import { useCheckoutController } from "@/controllers/CheckoutController";  
import styles from "@/app/movie/[id]/styles.module.css";

export default function CheckoutPage() {
    const router = useRouter();
    const params = useParams();                                    
    const session = useSession();                                  

    const model = useMoviePageModel(params, session);  
    const c = useCheckoutController();                             

    if (model.loading || c.loadingInitial || !model.movie) {
        return <div className={styles.mainDiv}>Loading...</div>;
    }

    const movie = model.movie;                           

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {  
        c.handleSubmit(event, movie.title);
    };

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#0f172a",
            padding: "24px",
            color: "white"
        }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: 800, margin: "0 auto" }}>
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
                    <div style={{ flex: 1, display: "grid", gap: 12 }}>
                        <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Booking Summary</h2>

                        <div><strong>User:</strong> {c.user?.email ?? session.data?.user?.email}</div> 
                        <div><strong>Movie:</strong> {movie.title}</div>                               
                        <div><strong>Showtime:</strong> {c.date} at {c.showtime}</div>                
                        <div><strong>Auditorium:</strong> {c.auditorium}</div>                         

                        <hr style={{ borderColor: "#334155" }} />

                        <div><strong>Total Tickets:</strong> {c.totalTickets}</div>                    
                        <div><strong>Adult Tickets:</strong> {c.adultTickets}</div>                    
                        <div><strong>Child Tickets:</strong> {c.childTickets}</div>                    
                        <div><strong>Senior Tickets:</strong> {c.seniorTickets}</div>                  

                        <hr style={{ borderColor: "#334155" }} />

                        <div><strong>Selected Seats:</strong></div>
                        <div>
                            {c.selectedSeats.length > 0 ? c.selectedSeats.join(", ") : "None"}         
                        </div>

                        <hr style={{ borderColor: "#334155" }} />

                        <div>
                            <strong>Order total:</strong>
                            <div>{`Adult tickets: $${c.adultPrice} * ${c.adultTickets}`}</div>         
                            <div>{`Child tickets: $${c.childPrice} * ${c.childTickets}`}</div>         
                            <div className='mb-4'>{`Senior tickets: $${c.seniorPrice} * ${c.seniorTickets}`}</div> 
                            <div>Promotion discount: {`${(1 - c.promoApplied.multiplier) * 100}%`}</div> 
                            <div><strong>Final total: </strong>{`$${c.finalOrderTotal.toFixed(2)}`}</div> 
                        </div>

                        <hr style={{ borderColor: "#334155" }} />

                        <label htmlFor="cardSelector"><strong>Select a payment card:</strong></label>
                        <select
                            id="cardSelector"
                            name="cardSelector"
                            className="bg-white text-black rounded-md p-1"
                            value={c.selectedCard}                             
                            onChange={c.handleCardChange}                       
                            required
                        >
                            <option disabled hidden value=''>Select a card</option> /* CHANGED default */
                            {c.cardsList?.map((card, index) => (                
                                <option value={`${index}`} key={`${card.lastFour}-${index}`}
                                        className="text-black">
                                    ●●●● ●●●● ●●●● {card.lastFour}
                                </option>
                            ))}
                            {c.cardsList?.length < 3 &&
                                <option value='new-card' key='new-card'>New card</option>
                            }
                        </select>

                        {c.selectedCard === 'new-card' && (                    
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
                            <br />
                            <input
                                type='text'
                                id='promo'
                                className='p-1 bg-white rounded-md text-black'
                                value={c.promo}                                  
                                onChange={c.handlePromoChange}                   
                            />
                            <button
                                type="button"
                                className='m-2 bg-emerald-800 rounded-md p-2'
                                onClick={c.handleApplyPromo}                     
                                disabled={c.isProcessing}                        
                            >
                                Apply Promo
                            </button>
                            {c.promoMessage !== '' && (
                                <div className={c.promoApplied.isApplied ? 'text-green-500' : 'text-red-500'}>
                                    {c.promoMessage}
                                </div>
                            )}
                        </div>
                    </div>

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
                            src={movie.png || "/fallback.jpg"}                 
                            alt={movie.title}                                    
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
                        disabled={c.isProcessing}                               
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
                        disabled={c.isProcessing}                               
                    >
                        {c.isProcessing ? 'Processing...' : 'Confirm & Pay'}    
                    </button>
                </div>
            </form>
        </div >
    );
}