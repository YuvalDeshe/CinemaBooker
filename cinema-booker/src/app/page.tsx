'use client';

import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import GenreDropdown from "./components/GenreDropdown";
import MovieList from "./components/MovieList";

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

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movies, setMovies] = useState<MovieData[]>([]);

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

  // temporary filtering as a proof of concept. will replace later when the database is up and running
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedGenres.length === 0 ||
      selectedGenres.some(genre => movie.genre.includes(genre)))
  );

  const currentlyRunning = filteredMovies.filter(m => m.isCurrentlyRunning);
  const comingSoon = filteredMovies.filter(m => !m.isCurrentlyRunning);
    
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
