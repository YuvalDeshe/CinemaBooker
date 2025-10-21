'use client';
import RegisterForm from "@/app/components/RegisterForm";

async function register(
    fname: string,
    lname: string,
    phone: string,
    email: string,
    password: string,
    cardType: string,
    cardNumber: string,
    expDate: string,
    billingStreet: string,
    billingCity: string,
    billingState: string,
    billingZip: string,
    street: string, // Restored: General Address Street
    city: string, // Restored: General Address City
    state: string, // Restored: General Address State
    zip: string, // Restored: General Address Zip
    promo: boolean
) {
        const userPayload = {
                username: email,
                firstName: fname,
                lastName: lname,
                email: email,
                password: password,
                userType: "CUSTOMER",
                userStatus: "PENDING",

                billingAddress: {
                        street: billingStreet,
                        city: billingCity,
                        state: billingState,
                        zip: billingZip,
                },

                paymentCard: [{
                        cardType: cardType,
                        cardNumber: cardNumber,
                        expDate: expDate,
                }],

                isRegisteredForPromos: promo,
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

        return(
            <div>
                    <RegisterForm handleRegister={register}></RegisterForm>
            </div>
        )
}
