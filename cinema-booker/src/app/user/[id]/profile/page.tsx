"use client";

import React, {useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import User from "@/models/UserModel";


type CompleteBooking = {
    booking: Booking;
    show: Show;
}

type Booking = {
    _id: string;
    movieID: string;
    promoCode: string;
    promoCodeID : string;
    showID: string;
    userID: string;
    bookingDate: string;
    orderTotal: number;
    seats: string[];
    tickets: {
        child: number,
        adult: number,
        senior: number,
    }
};

type Show = {
    _id: string;
    movieID: string;
    showRoomID: string;
    movieTitle: string;
    showRoomName: string;
    time: number;
    date: string;
    seatReservationArray: boolean[];
}

/** TO-DO
 * 1. Fix time to display correct value
 * 2. Change booking fetch to only get bookings that belong to user.
 * 3. Potentially edit CSS to look nicer
 * 4. Clean up middleware
 * 5. Refactor to MVC
 * 6. Test everything (including edit profile)!
 */


async function fetchUser(userId: string): Promise<User | null> {
    try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const user : User = await res.json();
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
  }


async function fetchBookingsFromApi(): Promise<Booking[] | null> {
    try {
        const response = await fetch("/api/users/profile/bookings");
        if (!response.ok) throw new Error("Failed to fetch bookings.");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
  }

  async function fetchShowFromApi(_id : string): Promise<Show | null> {
    try {
        const response = await fetch(`/api/users/profile/shows/${_id}`);
        if (!response.ok) throw new Error("Failed to fetch shows.");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
  }

function toCommaSeparatedList(arr: string[]): string {
  return arr.join(", ");
}
  
export default function UserProfilePage() {
const router = useRouter();
const { data: session } = useSession();

const [user, setUser] = useState<User | null>(null);
const [bookings, setBookings] = useState<Booking[] | null>(null);
const [completeBookings, setCompleteBookings] = useState<CompleteBooking[]>([]);


// Load user + bookings when the session loads
useEffect(() => {
  if (!session?.user?.id) return;

  const load = async () => {
    const fetchedUser = await fetchUser(session.user.id || "");
    setUser(fetchedUser);

    const fetchedBookings = await fetchBookingsFromApi();
    setBookings(fetchedBookings);
  };

  load();
}, [session?.user?.id]);


useEffect(() => {
  if (!bookings || bookings.length === 0) return;

  const loadShows = async () => {
    const shows = await Promise.all(
      bookings.map(b => fetchShowFromApi(b.showID))
    );

    // Combine booking + show
    const finalList: CompleteBooking[] = bookings.map((b, i) => ({
      booking: b,
      show: shows[i]!, // non-null assertion because API guarantees it
    }));

    setCompleteBookings(finalList);
  };

  loadShows();
}, [bookings]);



console.log("USER: ", user);
console.log("BOOKINGS: ", bookings);

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
                <p className="text-lg"><span className="font-medium">Name:</span> {user?.firstName} {user?.lastName}</p>
                <p className="text-lg mt-2"><span className="font-medium">Email:</span> {user?.email}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
                {bookings?.length === 0 ? (
                    <p className="text-gray-400">No bookings found.</p>
                ) : (
                    <div className="space-y-4">
                    {completeBookings?.map((completeBooking, index) => (
                        <div key={index} className="border-2 border-gray-700 p-4 rounded-lg bg-gray-850">
                            <p className="text-xl font-semibold">{completeBooking?.show.movieTitle}</p>
                            <p className="text-gray-300 mt-2 text-lg">Booking Placed: {completeBooking?.booking.bookingDate}</p>
                            <p className="text-gray-300 mt-2 text-lg">Theater: {completeBooking?.show.showRoomName}</p>
                            <p className="text-gray-300 mt-2 text-lg">Showtime: {completeBooking?.show.date} @ {completeBooking?.show.time}</p>
                            <p className="text-gray-300 mt-2 text-lg">Tickets: {completeBooking?.booking.tickets.child + completeBooking?.booking?.tickets.senior + completeBooking?.booking?.tickets.adult}</p>
                            <ul className="text-gray-300 list-disc text-base">
                                {completeBooking?.booking.tickets.child !== 0 && <li className="ml-6">{completeBooking?.booking.tickets.child}x Child Ticket{completeBooking?.booking.tickets.child != 1 && "s"}</li>}
                                {completeBooking?.booking.tickets.adult !== 0 && <li className="ml-6">{completeBooking?.booking.tickets.adult}x Adult Ticket{completeBooking?.booking.tickets.adult != 1 && "s"}</li>}
                                {completeBooking?.booking.tickets.senior !== 0 && <li className="ml-6">{completeBooking?.booking.tickets.senior}x Senior Ticket{completeBooking?.booking.tickets.senior != 1 && "s"}</li>}
                            </ul>
                            {completeBooking?.booking.promoCode !== "" && <p className="text-gray-300 mt-2 text-lg">Promo-Code Used: {completeBooking?.booking.promoCode}</p>}
                            <p className="text-gray-300 mt-2 text-lg">Reserved Seats: {toCommaSeparatedList(completeBooking?.booking.seats)}</p>
                            <p className="text-gray-200 font-medium mt-2 text-lg">Order Total: ${completeBooking?.booking.orderTotal.toFixed(2)}</p>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}

