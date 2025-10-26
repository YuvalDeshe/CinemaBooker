'use client';

import Movie from "@/app/components/Movie";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css"
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import TopBar from "@/app/components/TopBar";


//Array of hardcoded showtimes, loaded into the page dynamically.
const SHOWTIMES = ["9:00 a.m.", "12:00 p.m.", "3:00 p.m.", "6:00 p.m.", "9:00 p.m."]

//This is the defined movie type, which has all the info we talked about Tuesday night.
type Movie = {
  title: string;
  genre: string; //Maybe we could make this an enum or something, but not required.
  description: string;
  posterUrl: string;
  trailerLink: string;
  director: string;
  castList: string[]; //Idk what this data type will be, but Im assuming a String array for now.
  rating: string; //also could be an enum
  runTime: string;
  isCurrentlyRunning: boolean;
  _id: string;
}



export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => { 
    if (!id) return;
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div className={styles.mainDiv}>Loading...</div>;

  //array of cast members to string
  let actorsList: string = "";
  if (Array.isArray(movie.castList)) {
    actorsList = movie.castList.join(", ");
  } else if (typeof movie.castList === "string") {
    actorsList = movie.castList;
  }

  // embedded links # fixed error issue with db
  let embedLink: string = "";
  if (movie.trailerLink && typeof movie.trailerLink === "string") {
    const lastEq = movie.trailerLink.lastIndexOf("=");
    embedLink =
      "https://www.youtube.com/embed/" +
      (lastEq !== -1
        ? movie.trailerLink.substring(lastEq + 1)
        : movie.trailerLink);
  }


  const returnHandler = () => {
    router.push('/');
  };

  const goToBooking = (timeLabel: string) => {
    // use the dynamic id from the URL
    router.push(`/movie/${id}/booking?time=${encodeURIComponent(timeLabel)}`);
  };


  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <div className={styles.primaryMovieDiv}>
        <img className={styles.moviePoster} src={movie.posterUrl}></img>
        <iframe className={styles.trailer}
          src= {embedLink}
          title="YouTube video player"
          // style border
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
      <div className={styles.movieInfo}>
        <p className={styles.movieInfoItems}>{movie.runTime}</p>
        <p className={styles.movieInfoItems}>|</p>
        <p className={styles.movieInfoItems}>{movie.genre}</p>
        <p className={styles.movieInfoItems}>|</p>
        <p className={styles.movieInfoItems}>{movie.rating}</p>
      </div>
      <p className={styles.description}>{movie.description}</p>
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Director:</h3>
      <p className={styles.subSectionItems}>{movie.director}</p>
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Cast:</h3>
      <p className={styles.subSectionItems}>{actorsList}</p>
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Showtimes:</h3>
      {movie.isCurrentlyRunning && (
        <div className={styles.buttonsContainer}>
          {SHOWTIMES.map((value, index) =>(
            <button
              className={styles.showTimeButtons}
              onClick={() => goToBooking(value)}
              key={index}
            >
              {value}
            </button>
          ))}
        </div>
      )}
      {!movie.isCurrentlyRunning && (
        <p className={styles.subSectionItems}>Showtimes will be available when the movie is running.</p>
      )}
    </div>
  );
}