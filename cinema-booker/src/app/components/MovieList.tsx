import React from "react";
import Link from "next/link";
import Movie from "./Movie";

type MovieType = {
  title: string;
  genre: string[];
  posterUrl?: string;
  isCurrentlyRunning?: boolean;
  _id: string;
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
          key={movie._id}
        >
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="mb-2 w-40 h-60 object-cover rounded"
          />
          <h3 className="text-lg font-bold text-white">{movie.title}</h3>
          <p className="text-gray-300 text-sm mb-2">
            {movie.genre.join(", ")}
          </p>
          <div className="flex flex-col gap-2 w-full mt-4">
            <a
              href={`/movie/${movie._id}`}
              className="w-full"
            >
              <button
                className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                type="button"
              >
                Movie Details
              </button>
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}