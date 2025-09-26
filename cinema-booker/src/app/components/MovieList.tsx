import React from "react";
import Link from "next/link";
import Movie from "./Movie";

type MovieType = {
  title: string;
  genre: string[];
  posterUrl?: string;
<<<<<<< Updated upstream
  status?: string;
=======
  isCurrentlyRunning?: boolean;
  _id: string; // Add _id field here
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            {/* Only show Book tickets if not Coming soon */}
            {movie.status !== "Coming soon" && (
=======
            {/* show Book tickets if isCurrentlyRunning is true */}
            {movie.isCurrentlyRunning && (
>>>>>>> Stashed changes
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => alert(`Booking tickets for ${movie.title}`)}
              >
                Book tickets
              </button>
            )}
<<<<<<< Updated upstream
            <Link
              href={`/movies/${encodeURIComponent(movie.title)}`}
              className="w-full"
            >
=======
            <Link href={`/movie/${movie._id}`}>
>>>>>>> Stashed changes
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