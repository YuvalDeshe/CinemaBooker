export type MovieData = {
  title: string;
  genre: string[];
  posterUrl: string;
  isCurrentlyRunning: boolean;
  _id: string;
};

export async function fetchMoviesFromApi(): Promise<MovieData[]> {
  const response = await fetch("/api/movies");
  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }
  const data = await response.json();
  return data;
}

export function getHomepageMovieBuckets(
  movies: MovieData[],
  search: string,
  selectedGenres: string[]
) {
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedGenres.length === 0 ||
      selectedGenres.some((genre) => movie.genre.includes(genre)))
  );

  const currentlyRunning = filteredMovies.filter((m) => m.isCurrentlyRunning);
  const comingSoon = filteredMovies.filter((m) => !m.isCurrentlyRunning);

  return { filteredMovies, currentlyRunning, comingSoon };
}

export async function resendVerificationEmail(email: string) {
  const response = await fetch("/api/resend-verification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return { ok: response.ok, message: data?.message };
}