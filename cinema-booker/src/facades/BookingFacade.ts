import PaymentCard from "@/models/PaymentCardModel";
import BookingModel from "@/models/BookingModel";
import { PromoCode } from "@/models/PromoCodeModel";
import { Ticket } from "@/models/TicketModel";
import User from "@/models/UserModel";
import { BookingBuilder } from "@/builders/BookingBuilder";

/*
    I am writing this mostly for my own benefit
    This facade decouples checkout\page.ts from components like api endpoints, data models,
    or the sequence of steps required to complete a booking. All related api operations can now be
    easily found in the facade and this lowers the complexity of checkout\page.ts.
    
    Now uses Builder Design Pattern for constructing complex Booking objects.
 */

export class BookingFacade {

    private async fetchJson(url: string, errorMsg: string): Promise<any> {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(errorMsg);
            return await res.json();
        } catch (error) {
            console.error(error);
            return url.includes('ticket') || url.includes('promo') ? [] : null;
        }
    }

    public async fetchUser(userId: string): Promise<User | null> {
        if (!userId) return null;
        return this.fetchJson(`/api/users/${userId}`, "Failed to fetch user");
    }

    public async fetchPromos(): Promise<PromoCode[]> {
        return this.fetchJson(`/api/promo`, "Failed to fetch promos");
    }

    public async fetchTickets(): Promise<Ticket[]> {
        return this.fetchJson(`/api/ticket`, "Failed to fetch tickets");
    }

    // --- Business Logic / Transactional Methods (Facade Layer) ---
    public validatePromo(promoCode: string, promos: PromoCode[]): { isValid: boolean, message: string, multiplier: number, promo: PromoCode | undefined } {
        const enteredPromoCode = promos.find(p => p.name.toUpperCase() === promoCode.toUpperCase());

        if (promoCode !== '' && enteredPromoCode === undefined) {
            return { isValid: false, message: 'Invalid promo code!', multiplier: 1, promo: undefined };
        }

        if (!enteredPromoCode) {
            return { isValid: true, message: '', multiplier: 1, promo: undefined }; // No promo entered
        }

        const [endMonth, endDay, endYear] = enteredPromoCode.endDate.split("/").map(Number);
        const endDate = new Date(endYear, endMonth - 1, endDay);
        const [startMonth, startDay, startYear] = enteredPromoCode.startDate.split('/').map(Number);
        const startDate = new Date(startYear, startMonth - 1, startDay);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);

        if (startDate > currentDate || endDate < currentDate) {
            return { isValid: false, message: 'The entered promo code is inactive.', multiplier: 1, promo: enteredPromoCode };
        }

        const promoMultiplier = enteredPromoCode.priceMultiplier ?? 1;
        return { isValid: true, message: 'Promo applied!', multiplier: promoMultiplier, promo: enteredPromoCode };
    }

    private async createAndSaveNewCard(cardDetails: {
        cardNumber: string;
        expMonth: string;
        expYear: string;
        cardType: string;
    }, user: User): Promise<string> {
        const rawCardNumber = cardDetails.cardNumber.replace(/\s+/g, "");
        if (rawCardNumber.length < 4) {
            throw new Error("Card number is invalid.");
        }

        const lastFour = rawCardNumber.slice(-4);

        const newCard = new PaymentCard({
            cardType: cardDetails.cardType,
            cardNumber: rawCardNumber,
            expMonth: cardDetails.expMonth,
            expYear: cardDetails.expYear,
            lastFour,
            isNew: true,
            _tempId: crypto.randomUUID(),
        });

        const newCardsList = [...user.paymentCard, newCard];
        const userUpdateData = {
            _id: user._id,
            paymentCard: newCardsList
        }

        const res = await fetch(`/api/users/${user._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userUpdateData),
        });
        if (!res.ok) throw new Error("Failed to save new payment card to user profile.");

        return lastFour;
    }

    private async updateShowSeatReservations(showId: string, movieId: string, seats: string[]): Promise<void> {
        const showResponse = await fetch(`/api/shows?movieId=${movieId}`);
        if (!showResponse.ok) {
            throw new Error('Failed to fetch show data for seat update');
        }

        const shows: any[] = await showResponse.json();
        const currentShow = shows.find((s: any) => s._id === showId);

        if (!currentShow) {
            throw new Error('Show not found when updating seat reservations');
        }

        const existingReservations: string[] = currentShow.seatReservationArray || [];
        const updatedReservations = [...existingReservations, ...seats];

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
    }

    public async confirmAndPay(
        formData: FormData,
        user: User,
        selectedCard: string,
        cardsList: PaymentCard[],
        bookingDetails: {
            movieId: string;
            showId: string;
            promoCode: string;
            promo: PromoCode | undefined;
            adultTickets: number;
            childTickets: number;
            seniorTickets: number;
            adultPrice: number;
            childPrice: number;
            seniorPrice: number;
            selectedSeats: string[];
            movieTitle?: string;
            showtime?: string;
            date?: string;
            auditorium?: string;
        }
    ): Promise<{ bookingId: string; bookingData: any }> {
        const {
            movieId, showId, promoCode, promo, adultTickets, childTickets, seniorTickets,
            adultPrice, childPrice, seniorPrice, selectedSeats, movieTitle, showtime, date, auditorium
        } = bookingDetails;

        if (adultPrice === 0 || childPrice === 0 || seniorPrice === 0) {
            throw new Error('Invalid ticket price. Tickets must be fetched correctly.');
        }

        let cardLastFour: string;

        if (selectedCard === '') {
            throw new Error('No card selected.');
        } else if (selectedCard === 'new-card') {
            const cardDetails = {
                cardNumber: formData.get("cardNumber") as string,
                expMonth: formData.get("expMonth") as string,
                expYear: formData.get("expYear") as string,
                cardType: formData.get("cardType") as string, // Assumes radio button name is 'cardType'
            };

            if (!cardDetails.cardNumber || !cardDetails.expMonth || !cardDetails.expYear || !cardDetails.cardType) {
                throw new Error("Please fill in all card details.");
            }

            cardLastFour = await this.createAndSaveNewCard(cardDetails, user);
        } else {
            const card = cardsList[Number(selectedCard)];
            cardLastFour = card.lastFour;
        }

        const promoMultiplier = promo?.priceMultiplier ?? 1;
        const initialOrderTotal = (childTickets * childPrice) + (adultTickets * adultPrice) + (seniorTickets * seniorPrice);
        const finalOrderTotal = Math.trunc((initialOrderTotal * promoMultiplier) * 100) / 100;

        // Using Builder Design Pattern to construct the booking object
        // This provides a clean, fluent interface and ensures all required fields are set
        const bookingData = new BookingBuilder()
            .setMovieId(movieId)
            .setShowId(showId)
            .setUserId(user._id)
            .setPromoCode(promoCode ?? '', promo?._id ?? '')
            .setPaymentCard(cardLastFour)
            .setBookingDate(new Date().toISOString())
            .setOrderTotal(finalOrderTotal)
            .setSeats(selectedSeats)
            .setTickets(adultTickets, childTickets, seniorTickets)
            // Additional fields for email and confirmation
            .setUserEmail(user.email)
            .setUserName(user.firstName || 'Customer')
            .setMovieTitle(movieTitle || '')
            .setShowtime(showtime || '')
            .setDate(date || '')
            .setAuditorium(auditorium || '')
            .build();

        await this.updateShowSeatReservations(showId, movieId, selectedSeats);

        const response = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("Booking failed:", data.message);
            throw new Error(data.message || "Booking failed due to an unknown error.");
        }

        return {
            bookingId: data.bookingId,
            bookingData: {
                ...bookingData,
                bookingId: data.bookingId
            }
        };
    }
}

export const bookingFacade = new BookingFacade();