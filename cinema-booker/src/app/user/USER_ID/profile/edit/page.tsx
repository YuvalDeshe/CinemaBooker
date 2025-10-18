'use client';

import React, { useState, useEffect } from "react";
import MovieList from "@/app/components/MovieList";
import GenreDropdown from "@/app/components/GenreDropdown";
import SearchBar from "@/app/components/SearchBar";

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
      <main className="px-8 sm:px-32 pb-20">
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">GRAHHH</h2>
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
