export interface BookingData {
    movieID: string;
    promoCode: string;
    promoCodeID: string;
    showID: string;
    userID: string;
    bookingDate: string;
    orderTotal: number;
    seats: string[];
    tickets: {
        child: number;
        adult: number;
        senior: number;
    };
}

export default class BookingModel {
    movieID: string;
    promoCode: string;
    promoCodeID: string;
    showID: string;
    userID: string;
    bookingDate: string;
    orderTotal: number;
    seats: string[];
    tickets: {
        child: number;
        adult: number;
        senior: number;
    };

    constructor(data: BookingData) {
        this.movieID = data.movieID;
        this.promoCode = data.promoCode;
        this.promoCodeID = data.promoCodeID;
        this.showID = data.showID;
        this.userID = data.userID;
        this.bookingDate = data.bookingDate;
        this.orderTotal = data.orderTotal;
        this.seats = data.seats;
        this.tickets = data.tickets;
    }
}
