// UserProfileController.ts
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Booking, Show, CompleteBooking } from "@/models/UserProfileModel";
import User from "@/models/UserModel";

// --------------------------
// Backend Helpers
// --------------------------
async function fetchUser(userId: string): Promise<User | null> {
  try {
    const res = await fetch(`/api/users/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function fetchCompleteBookings(userID: string): Promise<CompleteBooking[]> {
  try {
    const res = await fetch(`/api/users/profile/complete/${userID}`);
    if (!res.ok) throw new Error("Failed to fetch complete bookings");
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

// --------------------------
// Utility Functions
// --------------------------
export function formatTime(time: number): string {
  if (time < 12) return `${time}:00 a.m.`;
  if (time === 12) return `12:00 p.m.`;
  return `${time - 12}:00 p.m.`;
}

export function toCommaSeparatedList(arr: string[]): string {
  return arr.join(", ");
}

// --------------------------
// Main Controller Hook
// --------------------------
export function useUserProfileController() {
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [completeBookings, setCompleteBookings] = useState<CompleteBooking[]>([]);
  const [bookingsLoaded, setBookingsLoaded] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    const load = async () => {
      const fetchedUser = await fetchUser(session.user.id || "");
      const fetchedComplete = await fetchCompleteBookings(session.user.id || "");

      const sorted = [...fetchedComplete].sort(
        (a, b) =>
          new Date(b.booking.bookingDate).getTime() -
          new Date(a.booking.bookingDate).getTime()
      );

      setUser(fetchedUser);
      setCompleteBookings(sorted);
      setBookingsLoaded(true);
    };

    load();
  }, [session?.user?.id]);

  // --------------------------
  // View Actions
  // --------------------------
  function editProfileHandler() {
    if (session?.user?.id) {
      router.push(`/user/${session.user.id}/profile/edit`);
    }
  }

  return {
    user,
    completeBookings,
    bookingsLoaded,
    formatTime,
    toCommaSeparatedList,
    editProfileHandler,
  };
}
