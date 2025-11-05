"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/app/components/RegisterForm";
import User from "@/types/User";

import Link from "next/link";

/* 
TODO: Change this to render the LoginForm component instead 
      of the raw JSX.
*/
export default function RegisterPage() {
        const [formData, setFormData] = useState({
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
                isRegisteredForPromos: false,
        });
        const [error, setError] = useState("");
        const [success, setSuccess] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value, type, checked } = e.target;
                setFormData(prev => ({
                        ...prev,
                        [name]: type === 'checkbox' ? checked : value
                }));
        };

        async function handleRegister(user: User) {
                let paymentCard: any[] = [];
                if (user.getCards().length != 0) {
                        paymentCard = [{
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

        return (
                <>
                        {!!error && (
                                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                                        {error}
                                </div>
                        )}
                        {!!success && (
                                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-md border border-green-500/60 bg-green-500/10 px-3 py-2 text-sm text-green-200">
                                        {success}
                                </div>
                        )}

                        <RegisterForm handleRegister={handleRegister} />
                </>
        );
}
