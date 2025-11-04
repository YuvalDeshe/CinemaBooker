'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./styles.module.css"
import ActorInfoForm from "@/app/components/ActorInfoForm";

export default function AddMovie() {
  const router = useRouter();
  const { data: session, status } = useSession();

  type Actor = { id: string; name: string };
  let nextId = 0;
  const createActor = () => ({ id: String(nextId++), name: "" });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [runTimeMinutes, setRunTimeMinutes] = useState("");
  const [runTimeHours, setRunTimeHours] = useState("");
  const [rating, setRating] = useState("");
  const [trailerURL, setTrailerURL] = useState("");
  const [moviePosterURL, setMoviePosterURL] = useState("");
  const [director, setDirector] = useState("");
  const [actorsArray, setActorsArray] = useState<Actor[]>([createActor()]);


  const sampleText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...";
  const genreArray: string[] = ["Action", "Adventure", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];
  const MPAARatingArray: string[] = ["G", "PG", "PG-13", "R"];
  const MAX_ACTORS = 8; //Maximum number of actors able to be added to a movie;

  const ActorsButtonHandler = () => {
    setActorsArray(prev => (prev.length >= MAX_ACTORS ? prev : [...prev, { id: crypto.randomUUID(), name: "" }]));
  };

const onDeleteHandler = (id: string) => {
  setActorsArray(prev => prev.filter(actor => actor.id !== id));
};

  const isActorsButtonDisabled = actorsArray.length >= MAX_ACTORS;
 
  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.addMovieHeading}>Add Movie</h1>
      <hr className={styles.hr}/>
      <form className={styles.formContainer}>
        <label className={styles.label}>Title</label>
        <input onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. The Godfather" className={styles.inputField} name="title" type="text"/>
        <label className={styles.label}>Description</label>
        <textarea onChange={(e) => setDescription(e.target.value)} maxLength={1500} required placeholder={sampleText} className={styles.textArea} rows={10} cols={10}></textarea>
        <label className={styles.label}>Genre</label>
         {/**Genre Dropdown Component Here*/}
        <label className={styles.label}>Runtime</label>
        <div className={styles.runTimeContainer}>
          <input onChange={(e) => setRunTimeHours(e.target.value)} required placeholder="HH" maxLength={2} className={styles.runTimeInput} name="hour" type="text"/>
          <input onChange={(e) => setRunTimeMinutes(e.target.value)} required placeholder="MM" maxLength={2} className={styles.runTimeInput} name="mins" type="text"/>
        </div>
        <label className={styles.label}>Rating</label>
        {/**Should be a dropdown, delete below input field*/}
        <input className={styles.inputField} name="rating" type="text"/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Trailer URL</label>
        <input onChange={(e) => setTrailerURL(e.target.value)} required placeholder="www.youtube.com/..." className={styles.inputURL} name="trailerurl" type="url"/>
        <label className={styles.label}>Movie Poster Image URL</label>
        <input onChange={(e) => setMoviePosterURL(e.target.value)} required placeholder="https://i.imgur.com/..." className={styles.inputURL} name="movieposterurl" type="url"/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Director</label>
        <input onChange={(e) => setDirector(e.target.value)} required placeholder="John Doe" className={styles.inputField} name="director" type="text"/>
        <label className={styles.label}>Actors</label>
        {actorsArray.map((actor) => (
          <ActorInfoForm
            key={actor.id}
            name={actor.name}
            onChange={(actorName: string) => {
              setActorsArray(prev =>
                prev.map(a => a.id === actor.id ? { ...a, name: actorName } : a)
              );
            }}
            onDelete={() => onDeleteHandler(actor.id)}
          />
        ))}
        <button disabled={isActorsButtonDisabled} type="button" onClick={ActorsButtonHandler} className={isActorsButtonDisabled ? (styles.addActorDisabled) : (styles.addActor)}>Add Actor</button>
        <hr className={styles.hr}/>
        <input className={styles.submitButton} type="submit" value="Submit"/>
      </form>
    </div>
  );
}