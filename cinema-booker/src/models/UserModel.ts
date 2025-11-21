import Address from "./AddressModel";
import PaymentCard from "./PaymentCardModel";

export default class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    homeAddress: Address;
    paymentCard: PaymentCard[];
    isRegisteredForPromos: boolean;
    userType: string;
    userStatus: string;

    constructor({
        _id,
        firstName,
        lastName,
        email,
        password,
        homeAddress,
        paymentCard,
        isRegisteredForPromos,
        userType,
        userStatus
    }: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password?: string;
        homeAddress: Address;
        paymentCard: PaymentCard[];
        isRegisteredForPromos: boolean;
        userType: string;
        userStatus: string;
        }) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.homeAddress = homeAddress;
        this.paymentCard = paymentCard;
        this.isRegisteredForPromos = isRegisteredForPromos;
        this.userType = userType;
        this.userStatus = userStatus;
    }
}
