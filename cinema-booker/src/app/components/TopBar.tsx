"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TopBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          🎬 Cinema Booker
        </Link>
        
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span>Welcome, {session.user?.email}</span>
              <button
                onClick={() => {
                  // If user is on a booking page, redirect to home after sign out
                  if (pathname.includes('/booking')) {
                    signOut({ callbackUrl: '/' });
                  } else {
                    signOut();
                  }
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}