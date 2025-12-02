"use client";

import React from "react";
import { useUserProfileController } from "@/controllers/UserProfileController";

export default function UserProfilePage() {
  const c = useUserProfileController(); // ✔ ONLY logic allowed in view

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">User Profile</h1>
          <button
            className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all"
            onClick={c.editProfileHandler}
          >
            Edit Profile
          </button>
        </div>

        {/* User info */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <p className="text-lg">
            <span className="font-medium">Name:</span> {c.user?.firstName} {c.user?.lastName}
          </p>
          <p className="text-lg mt-2">
            <span className="font-medium">Email:</span> {c.user?.email}
          </p>
        </div>

        {/* Booking history */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Booking History</h2>

          {c.completeBookings.length === 0 && !c.bookingsLoaded && (
            <p className="text-gray-400">Loading bookings...</p>
          )}

          {c.completeBookings.length === 0 && c.bookingsLoaded ? (
            <p className="text-gray-400">No bookings found.</p>
          ) : (
            <div className="space-y-4">
              {c.completeBookings.map((completeBooking, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-700 p-4 rounded-lg bg-gray-850"
                >
                  <p className="text-xl font-semibold">{completeBooking.show.movieTitle}</p>
                  <hr className="border-gray-700 mt-2 border-2 rounded-xl" />

                  <p className="text-gray-300 mt-2 text-lg">
                    Booking Placed: {completeBooking.booking.bookingDate}
                  </p>

                  <p className="text-gray-300 mt-2 text-lg">
                    Theater: {completeBooking.show.showRoomName}
                  </p>

                  <p className="text-gray-300 mt-2 text-lg">
                    Showtime: {completeBooking.show.date} @{" "}
                    {c.formatTime(completeBooking.show.time)}
                  </p>

                  <p className="text-gray-300 mt-2 text-lg">
                    Tickets:{" "}
                    {completeBooking.booking.tickets.child +
                      completeBooking.booking.tickets.adult +
                      completeBooking.booking.tickets.senior}
                  </p>

                  <ul className="text-gray-300 list-disc text-base ml-6">
                    {completeBooking.booking.tickets.child > 0 && (
                      <li>
                        {completeBooking.booking.tickets.child}x Child Ticket
                      </li>
                    )}
                    {completeBooking.booking.tickets.adult > 0 && (
                      <li>
                        {completeBooking.booking.tickets.adult}x Adult Ticket
                      </li>
                    )}
                    {completeBooking.booking.tickets.senior > 0 && (
                      <li>
                        {completeBooking.booking.tickets.senior}x Senior Ticket
                      </li>
                    )}
                  </ul>

                  {completeBooking.booking.promoCode && (
                    <p className="text-gray-300 mt-2 text-lg">
                      Promo-Code Used: {completeBooking.booking.promoCode}
                    </p>
                  )}

                  <p className="text-gray-300 mt-2 text-lg">
                    Reserved Seats:{" "}
                    {c.toCommaSeparatedList(completeBooking.booking.seats)}
                  </p>

                  <hr className="border-gray-700 mt-2 border-2 rounded-xl" />
                  <p className="text-gray-200 font-medium mt-2 text-lg">
                    Order Total: ${completeBooking.booking.orderTotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/** TO-DO 
 * (DONE) 1. Fix time to display correct value 
 * (DONE) 2. Change booking fetch to only get bookings that belong to user. 
 * (DONE) 3. Potentially edit CSS to look nicer * 
 * 4. Clean up middleware (and make sure other users cant see the profiles of others)! 
 * (DONE) 5. Refactor to MVC 
 * 6. Test everything (including edit profile)! 
 * (DONE) 7. Sort booking history by time. 
 **/