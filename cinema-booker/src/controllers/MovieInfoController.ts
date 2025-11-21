export type Movie = {
  title: string;
  genre: string;
  description: string;
  posterUrl: string;
  trailerLink: string;
  director: string;
  castList: string[] | string;
  rating: string;
  runTime: string;
  isCurrentlyRunning: boolean;
  _id: string;
};

export type ShowTime = {
  _id: string;
  movieID: string;
  showRoomID: string;
  movieTitle: string;
  showRoomName: string;
  time: number;
  date: string;
  seatReservationArray: string[];
};

export async function fetchMovieById(id: string): Promise<Movie | null> {
  const res = await fetch(`/api/movies/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  const data = await res.json();
  return data as Movie;
}

export async function fetchShowTimesByMovie(movieId: string): Promise<{
  shows: ShowTime[];
  availableDates: string[];
  defaultDate: string;
}> {
  const res = await fetch(`/api/shows?movieId=${movieId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch showtimes");
  }

  const shows: ShowTime[] = await res.json();

  const dates = [...new Set(shows.map((show) => show.date))].sort();
  const defaultDate = dates.length > 0 ? dates[0] : "";

  return { shows, availableDates: dates, defaultDate };
}

export function buildActorsList(castList: string[] | string): string {
  if (Array.isArray(castList)) {
    return castList.join(", ");
  }
  if (typeof castList === "string") {
    return castList;
  }
  return "";
}

export function buildEmbedLink(trailerLink: string): string {
  if (!trailerLink || typeof trailerLink !== "string") {
    return "";
  }

  const lastEq = trailerLink.lastIndexOf("=");
  const videoId =
    lastEq !== -1 ? trailerLink.substring(lastEq + 1) : trailerLink;

  return `https://www.youtube.com/embed/${videoId}`;
}

export function formatTime(time: number): string {
  const hour = time;
  if (hour === 0) return "12:00 AM";
  if (hour < 12) return `${hour}:00 AM`;
  if (hour === 12) return "12:00 PM";
  return `${hour - 12}:00 PM`;
}

export function formatSelectedDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getShowTimesForDate(
  showTimes: ShowTime[],
  selectedDate: string
): ShowTime[] {
  return showTimes.filter((show) => show.date === selectedDate);
}