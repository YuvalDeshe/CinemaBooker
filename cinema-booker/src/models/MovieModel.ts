export type Movie = {
  title: string;
  genre: string;
  description: string;
  png: string;
  trailer: string;
  director: string;
  cast: string;
  rating: string;
  runtime: string;
  isCurrentlyRunning: boolean;
};

export const genreArray: string[] = ["Action", "Adventure", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];
export const MPAARatingArray: string[] = ["G", "PG", "PG-13", "R"];

export class MovieModel implements Movie {
  title: string;
  genre: string;
  description: string;
  png: string;
  trailer: string;
  director: string;
  cast: string;
  rating: string;
  runtime: string;
  isCurrentlyRunning: boolean;

  constructor({
    title = "",
    genre = "",
    description = "",
    png = "",
    trailer = "",
    director = "",
    cast = "",
    rating = "",
    runtime = "",
    isCurrentlyRunning = false,
  }: Partial<Movie> = {}) {
    this.title = title;
    this.genre = genre;
    this.description = description;
    this.png = png;
    this.trailer = trailer;
    this.director = director;
    this.cast = cast;
    this.rating = rating;
    this.runtime = runtime;
    this.isCurrentlyRunning = isCurrentlyRunning;
  }
}

