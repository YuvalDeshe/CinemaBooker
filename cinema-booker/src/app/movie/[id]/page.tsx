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
import { useMoviePageController } from "@/controllers/MovieInfoController";

export default function MoviePage() {
    const c = useMoviePageController(useParams(), useSession());

  if (c.loading || !c.movie)
    return <div className={styles.mainDiv}>Loading...</div>;


  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.movieTitle}>{c.movie.title}</h1>
      <div className={styles.primaryMovieDiv}>
        <img className={styles.moviePoster} src={c.movie.png}></img>
        <iframe className={styles.trailer}
          src= {c.embedLink}
          title="YouTube video player"
          // style border
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
      <div className={styles.movieInfo}>
        <p className={styles.movieInfoItems}>{c.movie.runtime}</p>
        <p className={styles.movieInfoItems}>|</p>
        <p className={styles.movieInfoItems}>{c.movie.genre}</p>
        <p className={styles.movieInfoItems}>|</p>
        <p className={styles.movieInfoItems}>{c.movie.rating}</p>
      </div>
      <p className={styles.description}>{c.movie.description}</p>
      <hr className={styles.hr}/>
            <h3 className={styles.subSectionHeading}>Showtimes:</h3>
      {!c.session && c.movie.isCurrentlyRunning && c.availableDates.length > 0 && (
        <p className={styles.subSectionItems} style={{marginBottom: '10px', color: '#fbbf24'}}>
          Sign in to book tickets for these showtimes:
        </p>
      )}
      {c.movie.isCurrentlyRunning && c.availableDates.length > 0 ? (
        <div>
          {/* Date Selector with Calendar */}
          <div ref={c.calendarRef} style={{ marginBottom: '20px', position: 'relative' }}>
            <label className={styles.subSectionItems} style={{ display: 'block', marginBottom: '8px' }}>
              Select Date:
            </label>
            <button
              onClick={c.toggleCalendar}
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
                {c.selectedDate ? formatSelectedDate(c.selectedDate) : 'Choose a date'}
              </span>
              <span style={{ fontSize: '12px' }}>
                {c.isCalendarOpen ? '▲' : '▼'}
              </span>
            </button>
            
            <Calendar
              availableDates={c.availableDates}
              selectedDate={c.selectedDate}
              onDateSelect={(date) => c.setSelectedDate(date)}
              isOpen={c.isCalendarOpen}
              onToggle={c.toggleCalendar}
            />
          </div>

          {/* Showtimes for Selected Date */}
          {c.showTimesForDate.length > 0 ? (
            <div className={styles.buttonsContainer}>
              {c.showTimesForDate.map((show) => (
                <button
                  className={styles.showTimeButtons}
                  onClick={() => c.goToBooking(show)}
                  key={show._id}
                >
                  {formatTime(show.time)}
                  <span style={{fontSize: '10px', display: 'block', color: '#9ca3af'}}>
                    {show.showRoomName}
                  </span>
                  {!c.session && <span style={{fontSize: '10px', display: 'block'}}>Sign in to book</span>}
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.subSectionItems}>No showtimes available for this date.</p>
          )}
        </div>
      ) : c.movie.isCurrentlyRunning ? (
        <p className={styles.subSectionItems}>Loading showtimes...</p>
      ) : (
        <p className={styles.subSectionItems}>Showtimes will be available when the movie is running.</p>
      )}
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Director:</h3>
      <p className={styles.subSectionItems}>{c.movie.director}</p>
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Cast:</h3>
      <p className={styles.subSectionItems}>{c.movie.cast}</p>
    </div>
  );
}