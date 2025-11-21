"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import SearchBar from "./components/SearchBar";
import GenreDropdown from "./components/GenreDropdown";
import MovieList from "./components/MovieList";
import EmailVerificationBanner from "./components/EmailVerificationBanner";

import {
  fetchMoviesFromApi,
  getHomepageMovieBuckets,
  resendVerificationEmail,
  MovieData,
} from "../controllers/HomeController";

function HomeContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  const showVerificationRequired =
    searchParams.get("verification-required") === "true";
  const isAuthenticated = status === "authenticated";
  const isEmailVerified = session?.user?.isEmailVerified ?? false;

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMoviesFromApi();
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    loadMovies();
  }, []);

  const handleResendVerificationEmail = async () => {
    if (!session?.user?.email) return;

    setIsResendingEmail(true);
    try {
      const result = await resendVerificationEmail(session.user.email);

      if (result.ok) {
        alert("Verification email sent! Please check your inbox.");
      } else {
        alert(result.message || "Failed to send verification email.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      alert("An error occurred while sending the verification email.");
    } finally {
      setIsResendingEmail(false);
    }
  };

  // Controller handles all filtering / splitting logic
  const { currentlyRunning, comingSoon } = getHomepageMovieBuckets(
    movies,
    search,
    selectedGenres
  );

  return (
    <div className="font-sans min-h-screen bg-gray-900">
      {/* Header with Search + Genre Filter */}
      <header className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 px-8 sm:px-32">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="w-auto">
          <GenreDropdown
            selected={selectedGenres}
            setSelected={setSelectedGenres}
          />
        </div>
      </header>

      {/* Email Verification Banner */}
      {isAuthenticated && (!isEmailVerified || showVerificationRequired) && (
        <div className="px-8 sm:px-32 mb-6">
          <EmailVerificationBanner
            userEmail={session?.user?.email || undefined}
            onResendEmail={handleResendVerificationEmail}
            isResending={isResendingEmail}
          />
        </div>
      )}

      {/* Movie Lists */}
      <main className="px-8 sm:px-32 pb-20">
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">
            Currently Running
          </h2>
          <MovieList movies={currentlyRunning} />
        </section>

        <section className="mt-12">
          <h2 className="text-white text-2xl font-bold mb-4">Coming Soon</h2>
          <MovieList movies={comingSoon} />
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}