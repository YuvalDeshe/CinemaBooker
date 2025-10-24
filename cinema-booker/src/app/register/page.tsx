'use client';
import RegisterForm from "@/app/components/RegisterForm";
import User from "@/types/User";

// TODO: move this function to its own class to follow SOLID design principles and adhere to MVC framework
async function register(user: User) {
        let paymentCard: any[] = [];
        if (user.getCards().length != 0) {
                let paymentCard = [{
                        cardType: user.getCards()[0].getCardType() ?? '',
                        cardNumber: user.getCards()[0].getCardNumber() ?? '',
                        expMonth: user.getCards()[0].getExpMonth() ?? '',
                        expYear: user.getCards()[0].getExpYear() ?? '',
                        billingAddress: {
                                street: user.getCards()[0].getBillingStreet() ?? '',
                                city: user.getCards()[0].getBillingCity() ?? '',
                                state: user.getCards()[0].getBillingState() ?? '',
                                zip: user.getCards()[0].getBillingZip() ?? '',
                        }
                }]
        }
        const userPayload = {
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                password: user.getPassword(), // TODO(?): hash password
                phone: user.getPhoneNumber(),
                userType: "CUSTOMER",
                userStatus: user.getStatus(),

                homeAddress: {
                        street: user.getAddress().street,
                        city: user.getAddress().city,
                        state: user.getAddress().state,
                        zip: user.getAddress().zip
                },

                /* 
                TODO:
                make this field optional somehow. the user does not need
                to provide a payment method at registration.
                as is, this will throw an error if the user did not
                enter a card.
                */
                paymentCard: paymentCard, 

                // TODO: add orderHistory to the database
                orderHistory: [],
                isRegisteredForPromos: user.getPromo(),
        };

        console.log("Attempting to register user with payload:", userPayload);

        try {
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
                        window.location.href = '/login';

                } else {
                        console.error("Registration failed:", data.message);
                }

        } catch (error) {
                console.error("Network or unexpected error during registration:", error);
        }
}

export default function Register() {

        return (
                <div>
                        <RegisterForm handleRegister={register}></RegisterForm>
                </div>
        )
}
