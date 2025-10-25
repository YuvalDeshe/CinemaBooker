export default class Card {
    private cardType: string;
    private cardNumber: string;
    private expMonth: string;
    private expYear: string;
    private billingStreet: string;
    private billingCity: string;
    private billingState: string;
    private billingZip: string;

    public constructor(cardType: string, cardNumber: string, expMonth: string, expYear: string, billingStreet: string,
        billingCity: string, billingState: string, billingZip: string) {
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.billingStreet = billingStreet;
        this.billingCity = billingCity;
        this.billingState = billingState;
        this.billingZip = billingZip;
    }

    public getCardType() {
        return this.cardType;
    }
    public setCardType(type: string) {
        let input = type.toLowerCase();
        if (input !== 'credit' && input !== 'debit') {
            throw new Error("Couldn't set card. Invalid card type provided.");
        } else {
            this.cardType = input;
        }
    }

    public getCardNumber() {
        return this.cardNumber;
    }
    public setCardNumber(number: string) {
        this.cardNumber = number;
    }

    public getExpMonth() {
        return this.expMonth;
    }
    public setExpMonth(month: string) {
        let num = Number(month)
        if (!Number.isInteger(num) || num < 1 || num > 12) {
            throw new Error("Invalid expiration month. Must be an integer between 1 and 12.");
        }
        this.expMonth = month;
    }

    public getExpYear() {
        return this.expYear;
    }
    public setExpYear(year: string) {
        let num = Number(year)
        const nowYear = new Date().getFullYear();
        if (!Number.isInteger(num) || num < nowYear) {
            throw new Error(`Invalid expiration year. Year must not be in the past.`);
        }
        this.expYear = year;
    }

    public getBillingStreet() {
        return this.billingStreet;
    }
    public setBillingStreet(street: string) {
        this.billingStreet = street;
    }

    public getBillingCity() {
        return this.billingCity;
    }
    public setBillingCity(city: string) {
        this.billingCity = city;
    }

    public getBillingState() {
        return this.billingState;
    }
    public setBillingState(state: string) {
        this.billingState = state;
    }

    public getBillingZip() {
        return this.billingZip;
    }
    public setBillingZip(zip: string) {
        // Accept 5-digit or 5+4 ZIP formats
        if (!/^\d{5}(-\d{4})?$/.test(zip)) {
            throw new Error("Invalid ZIP code format.");
        }
        this.billingZip = zip;
    }

}
