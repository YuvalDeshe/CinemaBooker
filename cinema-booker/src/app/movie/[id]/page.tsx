'use client';

import React from "react";
import styles from "./styles.module.css"
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Calendar from "@/app/components/Calendar";
import {
  fetchMovieById,
  fetchShowTimesByMovie,
  buildEmbedLink,
  formatTime,
  formatSelectedDate,
  getShowTimesForDate,
  ShowTime
} from "@/controllers/MovieInfoController";
import { Movie } from "@/models/MovieModel";

type LocalShowTime = ShowTime;



export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [showTimes, setShowTimes] = React.useState<LocalShowTime[]>([]);
  const [availableDates, setAvailableDates] = React.useState<string[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch movie details
  React.useEffect(() => { 
    if (!id) return;

    const loadMovie = async () => {
      try {
        const movieData = await fetchMovieById(`${id}`);
        if (!movieData) return; // ensure not null
        setMovie(new Movie(movieData));  
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    loadMovie();
  }, [id]);

  // Fetch showtimes for this movie
  React.useEffect(() => {
    if (!id) return;
    
    const loadShowTimes = async () => {
      try {
        setLoading(true);
        const { shows, availableDates, defaultDate } = await fetchShowTimesByMovie(`${id}`);
        
        setShowTimes(shows);
        setAvailableDates(availableDates);
        
        // Set the first available date as default
        if (defaultDate) {
          setSelectedDate(defaultDate);
        }
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShowTimes();
  }, [id]);

  if (!movie || loading) return <div className={styles.mainDiv}>Loading...</div>;

  // embedded links # fixed error issue with db
  console.log("MOVIE.TRAILER: ", movie.trailer)
  const embedLink: string = buildEmbedLink(movie.trailer);

  const goToBooking = (show: LocalShowTime) => {
    if (!session) {
      // Redirect to login with a return URL
      router.push(`/login?redirect=/movie/${id}/booking&showId=${show._id}`);
      return;
    }
    
    if (session.user && !session.user.isEmailVerified) {
      // Show message about email verification
      alert("Please verify your email address before booking tickets. Check your inbox for a verification email.");
      return;
    }
    
    // Proceed to booking with showtime info
    const timeLabel = formatTime(show.time);
    router.push(`/movie/${id}/booking?showId=${show._id}&time=${encodeURIComponent(timeLabel)}&date=${encodeURIComponent(show.date)}&auditorium=${encodeURIComponent(show.showRoomName)}`);
  };

  // Get showtimes for the selected date
  const showTimesForDate = getShowTimesForDate(showTimes, selectedDate);

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <div className={styles.primaryMovieDiv}>
        <img className={styles.moviePoster} src={movie.png}></img>
        <iframe className={styles.trailer}
          src= {embedLink}
          title="YouTube video player"
          // style border
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
      <div className={styles.movieInfo}>
        <p className={styles.movieInfoItems}>{movie.runtime}</p>
        <p className={styles.movieInfoItems}>|</p>
        <p className={styles.movieInfoItems}>{movie.genre}</p>
        <p className={styles.movieInfoItems}>|</p>
        <p className={styles.movieInfoItems}>{movie.rating}</p>
      </div>
      <p className={styles.description}>{movie.description}</p>
      <hr className={styles.hr}/>
            <h3 className={styles.subSectionHeading}>Showtimes:</h3>
      {!session && movie.isCurrentlyRunning && availableDates.length > 0 && (
        <p className={styles.subSectionItems} style={{marginBottom: '10px', color: '#fbbf24'}}>
          Sign in to book tickets for these showtimes:
        </p>
      )}
      {movie.isCurrentlyRunning && availableDates.length > 0 ? (
        <div>
          {/* Date Selector with Calendar */}
          <div ref={calendarRef} style={{ marginBottom: '20px', position: 'relative' }}>
            <label className={styles.subSectionItems} style={{ display: 'block', marginBottom: '8px' }}>
              Select Date:
            </label>
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #374151',
                backgroundColor: '#1f2937',
                color: '#f9fafb',
                fontSize: '14px',
                minWidth: '280px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <span>
                {selectedDate ? formatSelectedDate(selectedDate) : 'Choose a date'}
              </span>
              <span style={{ fontSize: '12px' }}>
                {isCalendarOpen ? '▲' : '▼'}
              </span>
            </button>
            
            <Calendar
              availableDates={availableDates}
              selectedDate={selectedDate}
              onDateSelect={(date) => setSelectedDate(date)}
              isOpen={isCalendarOpen}
              onToggle={() => setIsCalendarOpen(!isCalendarOpen)}
            />
          </div>

          {/* Showtimes for Selected Date */}
          {showTimesForDate.length > 0 ? (
            <div className={styles.buttonsContainer}>
              {showTimesForDate.map((show) => (
                <button
                  className={styles.showTimeButtons}
                  onClick={() => goToBooking(show)}
                  key={show._id}
                >
                  {formatTime(show.time)}
                  <span style={{fontSize: '10px', display: 'block', color: '#9ca3af'}}>
                    {show.showRoomName}
                  </span>
                  {!session && <span style={{fontSize: '10px', display: 'block'}}>Sign in to book</span>}
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.subSectionItems}>No showtimes available for this date.</p>
          )}
        </div>
      ) : movie.isCurrentlyRunning ? (
        <p className={styles.subSectionItems}>Loading showtimes...</p>
      ) : (
        <p className={styles.subSectionItems}>Showtimes will be available when the movie is running.</p>
      )}
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Director:</h3>
      <p className={styles.subSectionItems}>{movie.director}</p>
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Cast:</h3>
      <p className={styles.subSectionItems}>{movie.cast}</p>
    </div>
  );
}