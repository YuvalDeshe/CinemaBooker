export class Ticket {
    ticketType: string;
    ticketPrice: number;

    constructor({
        ticketType,
        ticketPrice
    }: {
        ticketType: string;
        ticketPrice: number;
    }) {
        this.ticketType = ticketType;
        this.ticketPrice = ticketPrice;
    }
}
