'use client';

import Movie from "@/app/components/Movie";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css"
import { useRouter } from "next/navigation";

/** 
  NOTE: This page is located under the URL of movie/MOVIE_ID
  When the DB is implemented, have the movie's ID (or name or something else)
  replace "MOVIE_ID" (with "[id]" if I'm not mistaken) in the URL so that movies 
  can be loaded dynamically.
*/ 

//Array of hardcoded showtimes, loaded into the page dynamically.
const SHOWTIMES = ["9:00 a.m.", "12:00 p.m.", "3:00 p.m.", "6:00 p.m.", "9:00 p.m."]

//This is the defined movie type, which has all the info we talked about Tuesday night.
type Movie = {
  title: string;
  genre: string; //Maybe we could make this an enum or something, but not required.
  description: string;
  posterImgUrl: string;
  trailerLink: string;
  director: string;
  castList: string[]; //Idk what this data type will be, but Im assuming a String array for now.
  rating: string; //also could be an enum
  runtime: string;
}

/**
  This is the movie object. Once we have the DB up and running, replace the below fields with relevant info.
  Feel free to replace if you want, but currently, the webpage reads the info directly from
  this object called "movie".
*/
const movie: Movie = {
  title: "Movie Title",
  genre: "GENRE",
  description: "This is the description for the movie. Lorem ipsum dolor sit amet, \
  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore \
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \
  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat \
  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  posterImgUrl: "https://www.nextdayflyers.com/blog/wp-content/uploads/2012/02/drive.jpg",
  trailerLink: "https://www.youtube.com/watch?v=MtN1YnoL46Q",
  director: "Director Information",
  castList: ["Actor1", "Actor2", "Actor3", "Actor4", "Actor5"],
  rating: "RATING",
  runtime: "RUNTIME"
} 

export default function MoviePage() {

  //Turns array of actors in castList into a single comma-separated string.
  let actorsList: string = "";
  movie.castList.forEach((actor: String, index: number) => {
  if (index == movie.castList.length - 1) {
    actorsList = actorsList + actor;
  } else {
    actorsList += actor + ", ";
  }
  })

  //Makes the movies trailer youtube link embeddable.
  let embedLink: string = "https://www.youtube.com/embed/" + 
    movie.trailerLink.
    substring(movie.trailerLink.lastIndexOf("=") + 1, movie.trailerLink.length);

  const router = useRouter();

  const returnHandler = () => {
    router.push('/');
  };

  const bookMovieHandler = () => {
    router.push('/') //EDIT THIS PART TO NAVIGATE TO THE BOOKING PAGE
  };


  return (
    <div className={styles.mainDiv}>
      <div className={styles.topBar}>
        <button className={styles.homeButton} onClick={returnHandler}>
          <FontAwesomeIcon className={styles.icon} icon={faHouse}/> 
          <p className={styles.buttonText}>Home</p> 
        </button>
        <h2 className={styles.mainHeading}>Cinema E-Booking Site</h2>
        <button className={styles.tempButtonCSS}>
          <FontAwesomeIcon className={styles.icon} icon={faHouse}/> 
          <p className={styles.buttonText}>Home</p> 
        </button> {/*This will be the user profile icon*/}
      </div>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <div className={styles.primaryMovieDiv}>
        <img className={styles.moviePoster} src={movie.posterImgUrl}></img>
        <iframe className={styles.trailer}
          src= {embedLink}
          title="YouTube video player"
          //style{{border: "none" }} 
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
      <h3 className={styles.subSectionHeading}>Director:</h3>
      <p className={styles.subSectionItems}>{movie.director}</p>
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Cast:</h3>
      <p className={styles.subSectionItems}>{actorsList}</p>
      <hr className={styles.hr}/>
      <h3 className={styles.subSectionHeading}>Showtimes:</h3>
      <div className={styles.buttonsContainer}>
        {SHOWTIMES.map((value, index) =>(
          <button className={styles.showTimeButtons} onClick={bookMovieHandler} key={index}>{value}</button>
        ))}
      </div>
    </div>
  );
}