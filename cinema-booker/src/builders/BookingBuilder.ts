/**
 * BookingBuilder - Implements the Builder Design Pattern
 * 
 * Purpose: Simplifies the creation of complex Booking objects by providing
 * a fluent interface. This pattern is particularly useful when dealing with
 * objects that have many optional parameters or require step-by-step construction.
 * 
 * Benefits:
 * - Separates object construction from representation
 * - Provides a clear, readable API for building bookings
 * - Allows partial construction and validation at each step
 * - Makes it easier to add new fields without breaking existing code
 */

export interface BookingData {
    movieID: string;
    promoCode: string;
    promoCodeID: string;
    showID: string;
    userID: string;
    paymentCardUsed: string;
    bookingDate: string;
    orderTotal: number;
    seats: string[];
    tickets: {
        child: number;
        adult: number;
        senior: number;
    };
    // Extended fields for email and confirmation
    userEmail?: string;
    userName?: string;
    movieTitle?: string;
    showtime?: string;
    date?: string;
    auditorium?: string;
}

export class BookingBuilder {
    private booking: Partial<BookingData>;

    private constructor() {
        this.booking = {
            promoCode: '',
            promoCodeID: '',
            seats: [],
            tickets: {
                child: 0,
                adult: 0,
                senior: 0
            }
        };
    }

    /**
     * Sets the movie ID for the booking
     */
    setMovieId(movieID: string): BookingBuilder {
        this.booking.movieID = movieID;
        return this;
    }

    /**
     * Sets the show ID for the booking
     */
    setShowId(showID: string): BookingBuilder {
        this.booking.showID = showID;
        return this;
    }

    /**
     * Sets the user ID for the booking
     */
    setUserId(userID: string): BookingBuilder {
        this.booking.userID = userID;
        return this;
    }

    /**
     * Sets promo code information
     */
    setPromoCode(promoCode: string, promoCodeID: string = ''): BookingBuilder {
        this.booking.promoCode = promoCode;
        this.booking.promoCodeID = promoCodeID;
        return this;
    }

    /**
     * Sets the payment card used (last 4 digits)
     */
    setPaymentCard(lastFour: string): BookingBuilder {
        this.booking.paymentCardUsed = lastFour;
        return this;
    }

    /**
     * Sets the booking date (defaults to now if not provided)
     */
    setBookingDate(date?: string): BookingBuilder {
        this.booking.bookingDate = date || new Date().toISOString();
        return this;
    }

    /**
     * Sets the order total
     */
    setOrderTotal(total: number): BookingBuilder {
        this.booking.orderTotal = total;
        return this;
    }

    /**
     * Sets the selected seats
     */
    setSeats(seats: string[]): BookingBuilder {
        this.booking.seats = seats;
        return this;
    }

    /**
     * Sets ticket counts by type
     */
    setTickets(adult: number, child: number, senior: number): BookingBuilder {
        this.booking.tickets = { adult, child, senior };
        return this;
    }

    /**
     * Sets adult ticket count
     */
    setAdultTickets(count: number): BookingBuilder {
        if (!this.booking.tickets) {
            this.booking.tickets = { adult: 0, child: 0, senior: 0 };
        }
        this.booking.tickets.adult = count;
        return this;
    }

    /**
     * Sets child ticket count
     */
    setChildTickets(count: number): BookingBuilder {
        if (!this.booking.tickets) {
            this.booking.tickets = { adult: 0, child: 0, senior: 0 };
        }
        this.booking.tickets.child = count;
        return this;
    }

    /**
     * Sets senior ticket count
     */
    setSeniorTickets(count: number): BookingBuilder {
        if (!this.booking.tickets) {
            this.booking.tickets = { adult: 0, child: 0, senior: 0 };
        }
        this.booking.tickets.senior = count;
        return this;
    }

    /**
     * Sets user email (for confirmation emails)
     */
    setUserEmail(email: string): BookingBuilder {
        this.booking.userEmail = email;
        return this;
    }

    /**
     * Sets user name (for confirmation emails)
     */
    setUserName(name: string): BookingBuilder {
        this.booking.userName = name;
        return this;
    }

    /**
     * Sets movie title (for confirmation)
     */
    setMovieTitle(title: string): BookingBuilder {
        this.booking.movieTitle = title;
        return this;
    }

    /**
     * Sets showtime information
     */
    setShowtime(showtime: string): BookingBuilder {
        this.booking.showtime = showtime;
        return this;
    }

    /**
     * Sets show date
     */
    setDate(date: string): BookingBuilder {
        this.booking.date = date;
        return this;
    }

    /**
     * Sets auditorium
     */
    setAuditorium(auditorium: string): BookingBuilder {
        this.booking.auditorium = auditorium;
        return this;
    }

    /**
     * Validates that all required fields are set
     */
    private validate(): void {
        const required = ['movieID', 'showID', 'userID', 'paymentCardUsed', 'bookingDate', 'orderTotal'];
        const missing = required.filter(field => !this.booking[field as keyof BookingData]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required booking fields: ${missing.join(', ')}`);
        }

        if (!this.booking.seats || this.booking.seats.length === 0) {
            throw new Error('Booking must have at least one seat');
        }

        if (!this.booking.tickets) {
            throw new Error('Booking must have ticket information');
        }

        const totalTickets = this.booking.tickets.adult + this.booking.tickets.child + this.booking.tickets.senior;
        if (totalTickets === 0) {
            throw new Error('Booking must have at least one ticket');
        }
    }

    /**
     * Builds and returns the final BookingData object
     * Validates all required fields before returning
     */
    build(): BookingData {
        this.validate();
        return this.booking as BookingData;
    }

    /**
     * Resets the builder to create a new booking
     */
    reset(): BookingBuilder {
        this.booking = {
            promoCode: '',
            promoCodeID: '',
            seats: [],
            tickets: {
                child: 0,
                adult: 0,
                senior: 0
            }
        };
        return this;
    }

    /**
     * Creates a clone of the current booking state
     * Useful for creating similar bookings
     */
    clone(): BookingBuilder {
        const newBuilder = new BookingBuilder();
        newBuilder.booking = { ...this.booking };
        if (this.booking.tickets) {
            newBuilder.booking.tickets = { ...this.booking.tickets };
        }
        if (this.booking.seats) {
            newBuilder.booking.seats = [...this.booking.seats];
        }
        return newBuilder;
    }
}
