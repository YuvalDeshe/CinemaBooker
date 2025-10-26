'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import SearchBar from "./components/SearchBar";
import GenreDropdown from "./components/GenreDropdown";
import MovieList from "./components/MovieList";
import EmailVerificationBanner from "./components/EmailVerificationBanner";

// temporary hard-coded movies. will replace later when the database is up and running
// const MOVIES = [
//   { title: "Inception", genre: ["Sci-Fi", "Thriller"], posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmaTHAbTa2MTEGM_PwqBU61jEzjEcQfx-Zb39fyctMdZheq2Uj" },
//   { title: "Titanic", genre: ["Romance", "Drama"], posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png" },
//   { title: "Get Out", genre: ["Horror", "Thriller"], posterUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1wQ2BpfiaW0uOpXSEUmgg-Ea42e1L9PvIJHaoxE_BEawBUaaO"},
//   { title: "Superbad", genre: ["Comedy"], posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFIB8fMeJPVNx_aqLjJvTxNa4xpJjE9u_fyLMRV7y8se-HtOC_" },
// ];
type MovieData = {
    title: string;
    genre: string[];
    posterUrl: string;
    isCurrentlyRunning: boolean;
    _id: string;
};

function HomeContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  const showVerificationRequired = searchParams.get('verification-required') === 'true';
  const isAuthenticated = status === 'authenticated';
  const isEmailVerified = session?.user?.isEmailVerified ?? false;

  useEffect(() => {
      const fetchMovies = async () =>   {
          try {
              const response = await fetch("/api/movies");
              if (!response.ok) {
                  throw new Error("Failed to fetch movies.");
              }
              const data = await response.json();
              setMovies(data);
          } catch (err) {
              console.error(err);
          }
      };
      fetchMovies();
  }, []);

  const handleResendVerificationEmail = async () => {
    if (!session?.user?.email) return;

    setIsResendingEmail(true);
    try {
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Verification email sent! Please check your inbox.');
      } else {
        alert(data.message || 'Failed to send verification email.');
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
      alert('An error occurred while sending the verification email.');
    } finally {
      setIsResendingEmail(false);
    }
  };

  // temporary filtering as a proof of concept. will replace later when the database is up and running
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedGenres.length === 0 ||
      selectedGenres.some(genre => movie.genre.includes(genre)))
  );

  const currentlyRunning = filteredMovies.filter(m => m.isCurrentlyRunning);
  const comingSoon = filteredMovies.filter(m => !m.isCurrentlyRunning);
    // console.log(movies);

    return (
    <div className="font-sans min-h-screen bg-gray-900">
      <header className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 px-8 sm:px-32">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="w-auto">
          <GenreDropdown selected={selectedGenres} setSelected={setSelectedGenres} />
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
      
      <main className="px-8 sm:px-32 pb-20">
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">Currently Running</h2>
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
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
