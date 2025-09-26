import React from "react";
import Link from "next/link";
import Movie from "./Movie";

type MovieType = {
  title: string;
  genre: string[];
  posterUrl?: string;
  status?: string;
};

type MovieListProps = {
  movies: MovieType[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <section className="w-full flex flex-wrap gap-8 justify-center mt-8">
      {movies.map((movie) => (
        <div
          className="movie-card flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-4 w-64"
          key={movie.title}
        >
          <Movie title={movie.title} genre={movie.genre} posterUrl={movie.posterUrl} />
          <div className="flex flex-col gap-2 w-full mt-4">
            {/* Only show Book tickets if not Coming soon */}
            {movie.status !== "Coming soon" && (
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => alert(`Booking tickets for ${movie.title}`)}
              >
                Book tickets
              </button>
            )}
            <Link
              href={`/movies/${encodeURIComponent(movie.title)}`}
              className="w-full"
            >
              <button
                className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                type="button"
              >
                Movie Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}