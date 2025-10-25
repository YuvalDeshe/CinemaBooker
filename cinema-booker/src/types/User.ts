import Card from "./Card";

export const Status = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    SUSPENDED: "Suspended"
}

// TODO: (future deliverable) change User to an Interface with Admin and Customer extending it.
export default class User {
    private fname: string;
    private lname: string;
    private phone: string;
    private email: string;
    private password: string;
    private cards: Card[];
    private address: {street: string, city: string, state: string, zip: string}
    private promo: boolean;
    private status: string;

    public constructor(fname: string, lname: string, phone: string, email: string,
                       password: string, promo: boolean, 
                       address: {street: string, city: string, state: string, zip: string}, cards?: Card[]
    ) {
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        if (cards !== undefined) { // the user entered a card
            this.cards = cards;
        } else this.cards = [];
        if (address !== undefined) { // the user entered an address
            this.address = address;    
        } else this.address = {street: "", city: "", state: "", zip: ""};
        this.promo = promo;
        this.status = Status.INACTIVE;
    }

    public getFirstName() {
        return this.fname;
    }
    public setFirstName(name: string) {
        this.fname = name;
    }

    public getLastName() {
        return this.lname;
    }
    public setLastName(name: string) {
        this.lname = name;
    }

    public getPhoneNumber() {
        return this.phone;
    }
    public setPhoneNumber(number: string) {
        this.phone = number;
    }

    public getEmail() {
        return this.email;
    }
    public setEmail(address: string) {
        this.email = address;
    }

    public getPassword() {
        return this.password;
    }
    public setPassword(password: string) {
        this.password = password;
    }

    public getPromo() {
        return this.promo;
    }
    public setPromo(promo: boolean) {
        this.promo = promo;
    }

    public getCards() {
        return this.cards;
    }
    public addCard(card: Card) {
        if (this.cards.length >= 3) {
            throw new Error("Couldn't add card, user already has too many saved cards.");
        } else {
            this.cards.push(card);
        }
    }
    public removeCard(index: number) {
        if (index < 0 || index > 2) {
            throw new Error("Invalid index. Index should be an Integer from 0-2.")
        }
        this.cards.splice(index, 1);
    }
    public setCards(cards: Card[]) {
        if (cards.length > 3) {
            throw new Error("Couldn't set cards array. User can only have 3 cards.");
        }
        this.cards = cards;
    }

    public getAddress() {
        return this.address;
    }
    public setAddress(street: string, city: string, state: string, zip: string) {
        this.address = {street, city, state, zip};
    }
    public getStreet() {
        return this.address.street;
    }
    public setStreet(street: string) {
        this.address.street = street;
    }
    public getCity() {
        return this.address.city;
    }
    public setCity(city: string) {
        this.address.city = city;
    }
    public getState() {
        return this.address.state;
    }
    public setState(state: string) {
        this.address.state = state;
    }
    public getZip() {
        return this.address.zip;
    }
    public setZip(zip: string) {
        // Accept 5-digit or 5+4 ZIP formats
        if (!/^\d{5}(-\d{4})?$/.test(zip)) {
            throw new Error("Invalid ZIP code format.");
        }
        this.address.zip = zip;
    }

    public getStatus() {
        return this.status;
    }
    public setStatus(status: string) {
        if (!Object.values(Status).includes(status)) {
            throw new Error(`Could not change user status. Status must be one of the following:\n${Status.ACTIVE}\n${Status.INACTIVE}\n${Status.SUSPENDED}`, )
        }
        this.status = status;
    }
}
