"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Booking = {
  movie: string;
  date: string;
  ticketCount: number;
  ticketTypes: string[];
  orderTotal: number;
};

export default function UserProfilePage() {
const router = useRouter();
const { data: session } = useSession();

const firstName : string = "Jane"
const lastName : string = "Doe"
const email : string = "janedoe415@gmail.com"
const bookings: Booking[] = [];

const editProfileHandler = () => {
    console.log('Edit Profile clicked. Session:', session);
    console.log('User ID:', session?.user?.id);
    if (session?.user?.id) {
        const profileUrl = `/user/${session.user.id}/profile/edit`;
        console.log('Navigating to:', profileUrl);
        router.push(profileUrl);
    } else {
        console.log('No session or user ID, redirecting to login');
    }
}

return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">User Profile</h1>
                <button className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all" onClick={editProfileHandler}>
                Edit Profile
                </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
                <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                <p className="text-lg"><span className="font-medium">Name:</span> {firstName} {lastName}</p>
                <p className="text-lg mt-2"><span className="font-medium">Email:</span> {email}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
                {bookings.length === 0 ? (
                    <p className="text-gray-400">No bookings found.</p>
                ) : (
                    <div className="space-y-4">
                    {bookings.map((booking, index) => (
                        <div key={index} className="border border-gray-700 p-4 rounded-lg bg-gray-850">
                            <p className="text-xl font-semibold">{booking.movie}</p>
                            <p className="text-gray-300">Date: {booking.date}</p>
                            <p className="text-gray-300">Tickets: {booking.ticketCount}</p>
                            <p className="text-gray-300">Types: {booking.ticketTypes.join(", ")}</p>
                            <p className="text-gray-200 font-medium mt-2">Order Total: ${booking.orderTotal.toFixed(2)}</p>
                        </div>
                    ))}
                    </div>
                    )}
            </div>
        </div>
    </div>
    );
}

