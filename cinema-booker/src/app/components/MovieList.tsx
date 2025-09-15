import React from "react";
import Movie from "./Movie";

type MovieType = {
  title: string;
  genre: string[];
  posterUrl?: string;
};

type MovieListProps = {
  movies: MovieType[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <section className="w-full flex flex-wrap gap-8 justify-center mt-8">
      {movies.map((movie) => (
        <Movie key={movie.title} title={movie.title} genre={movie.genre} posterUrl={movie.posterUrl} />
      ))}
    </section>
  );
}