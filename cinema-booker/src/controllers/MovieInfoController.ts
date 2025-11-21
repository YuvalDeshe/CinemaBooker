import { Movie } from "@/models/MovieModel";
import React from "react";
import { useRouter } from "next/navigation";

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

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]
  const modernDates = filterAvailableDates(formattedToday, dates)
  console.log("AVAILABLE DATES: ", dates);
  console.log("UPDATED AVAILABLE DATES: ", modernDates)

  const defaultDate = modernDates.length > 0 ? modernDates[0] : "";

  return { shows, availableDates: modernDates, defaultDate };
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

export function filterAvailableDates(todaysDate : string, dateList : string[]) : string[] {
  const today = new Date(todaysDate);
  let updatedDateList : string[] = [];

  for (const date of dateList) {
    const current = new Date(date)

    if (current.getTime() >= today.getTime()) {
      updatedDateList.push(date);
    }
  }
  return updatedDateList;
}

export function useMoviePageController(params: any, sessionData: any) {
  const { id } = params;
  const session = sessionData?.data;
  const router = useRouter();

  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [showTimes, setShowTimes] = React.useState<ShowTime[]>([]);
  const [availableDates, setAvailableDates] = React.useState<string[]>([]);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  // close calendar on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node))
        setIsCalendarOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // fetch movie
  React.useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await fetchMovieById(`${id}`);
      if (data) setMovie(new Movie(data));
    })();
  }, [id]);

  // fetch showtimes
  React.useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const { shows, availableDates, defaultDate } =
        await fetchShowTimesByMovie(`${id}`);
      setShowTimes(shows);
      setAvailableDates(availableDates);
      if (defaultDate) setSelectedDate(defaultDate);
      setLoading(false);
    })();
  }, [id]);

  const embedLink = React.useMemo(
    () => (movie ? buildEmbedLink(movie.trailer) : ""),
    [movie]
  );

  const showTimesForDate = React.useMemo(
    () => getShowTimesForDate(showTimes, selectedDate),
    [showTimes, selectedDate]
  );

  const toggleCalendar = () => setIsCalendarOpen((v) => !v);

  const goToBooking = (show: ShowTime) => {
    if (!session)
      return router.push(
        `/login?redirect=/movie/${id}/booking&showId=${show._id}`
      );

    if (!session.user.isEmailVerified)
      return alert("Verify your email before booking.");

    const timeLabel = formatTime(show.time);

    router.push(
      `/movie/${id}/booking?showId=${show._id}&time=${encodeURIComponent(
        timeLabel
      )}&date=${encodeURIComponent(show.date)}&auditorium=${encodeURIComponent(
        show.showRoomName
      )}`
    );
  };

  return {
    movie,
    loading,
    availableDates,
    selectedDate,
    setSelectedDate,
    showTimesForDate,
    isCalendarOpen,
    toggleCalendar,
    calendarRef,
    embedLink,
    goToBooking,
    formatTime,
    formatSelectedDate,
    session,
  };
}