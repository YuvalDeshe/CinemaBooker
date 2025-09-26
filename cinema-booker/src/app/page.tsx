'use client';

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import GenreDropdown from "./components/GenreDropdown";
import MovieList from "./components/MovieList";

// temporary hard-coded movies. will replace later when the database is up and running
const MOVIES = [
  { title: "Inception", genre: ["Sci-Fi", "Thriller"], posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmaTHAbTa2MTEGM_PwqBU61jEzjEcQfx-Zb39fyctMdZheq2Uj", status: "Currently Running" },
  { title: "Titanic", genre: ["Romance", "Drama"], posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png", status: "Currently Running" },
  { title: "Get Out", genre: ["Horror", "Thriller"], posterUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1wQ2BpfiaW0uOpXSEUmgg-Ea42e1L9PvIJHaoxE_BEawBUaaO", status: "Coming soon" },
  { title: "Superbad", genre: ["Comedy"], posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFIB8fMeJPVNx_aqLjJvTxNa4xpJjE9u_fyLMRV7y8se-HtOC_", status: "Coming soon" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // temporary filtering as a proof of concept. will replace later when the database is up and running
  const filteredMovies = MOVIES.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedGenres.length === 0 ||
      selectedGenres.some(genre => movie.genre.includes(genre)))
  );

  // Separate movies by status
  const currentlyRunning = filteredMovies.filter(movie => movie.status === "Currently Running");
  const comingSoon = filteredMovies.filter(movie => movie.status === "Coming soon");

  return (
    <div className="font-sans min-h-screen bg-gray-900">
      <header className="mb-12 flex items-center justify-center gap-4 px-8 sm:px-32 bg-gray-950 py-6 rounded-b-lg shadow-md relative">
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <span className="text-white text-2xl font-bold tracking-wide">eCinema Booking</span>
        </div>
        <div className="flex flex-1 max-w-xl mx-auto gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <GenreDropdown selected={selectedGenres} setSelected={setSelectedGenres} />
        </div>
      </header>
      <main className="px-8 sm:px-32 pb-20">
        {filteredMovies.length === 0 ? (
          <div className="text-center text-white text-xl mt-8">No match found</div>
        ) : (
          <>
            <section>
              <h2 className="text-2xl text-white mb-4">Currently Running</h2>
              {currentlyRunning.length > 0 ? (
                <MovieList movies={currentlyRunning} />
              ) : (
                <div className="text-center text-gray-400 mb-8">No movies currently running.</div>
              )}
            </section>
            <section className="mt-12">
              <h2 className="text-2xl text-white mb-4">Coming soon</h2>
              {comingSoon.length > 0 ? (
                <MovieList movies={comingSoon} />
              ) : (
                <div className="text-center text-gray-400">No upcoming movies.</div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}