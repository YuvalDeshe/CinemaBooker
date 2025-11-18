import User from "@/types/User";

// This is the payload for the api
interface UserRegistrationPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    userType: "CUSTOMER";
    userStatus: string;
    homeAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    paymentCard?: any[]; //is left optional
    orderHistory: any[];
    isRegisteredForPromos: boolean;
}

export class RegisterService {

    private static createPayload(user: User): UserRegistrationPayload {
        let paymentCard: any[] | undefined = undefined;

        if (user.getCards().length > 0) {
            const card = user.getCards()[0];
            paymentCard = [{
                cardType: card.getCardType() ?? '',
                cardNumber: card.getCardNumber() ?? '',
                expMonth: card.getExpMonth() ?? '',
                expYear: card.getExpYear() ?? '',
                billingAddress: {
                    street: card.getBillingStreet() ?? '',
                    city: card.getBillingCity() ?? '',
                    state: card.getBillingState() ?? '',
                    zip: card.getBillingZip() ?? '',
                }
            }];
        }

        const userPayload: UserRegistrationPayload = {
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            password: user.getPassword(),
            phone: user.getPhoneNumber(),
            userType: "CUSTOMER",
            userStatus: user.getStatus(),
            homeAddress: user.getAddress(),
            orderHistory: [],
            isRegisteredForPromos: user.getPromo(),
        };

        if (paymentCard) {
            userPayload.paymentCard = paymentCard;
        }

        return userPayload;
    }

    public static async registerUser(user: User): Promise<void> {
        const userPayload = RegisterService.createPayload(user);

        console.log("Attempting to register user with payload:", userPayload);

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPayload),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Registration successful!", data);
            return; // Success
        } else {
            console.error("Registration failed:", data.message);
            throw new Error(data.message || "Registration failed due to an unknown error.");
        }
    }
}