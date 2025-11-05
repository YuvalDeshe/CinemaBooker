'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./styles.module.css"
import ActorInfoForm from "@/app/components/ActorInfoForm";
import CustomDropdown from "@/app/components/CustomDropdown";

export default function AddMovie() {
  const router = useRouter();

  type Movie = {
    title: String,
    genre: String,
    description: String,
    png: String,
    trailer: String,
    director: String,
    Cast: String,
    Rating: String,
    RunTime: String,
    isCurrentlyRunning: boolean,
  }
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

  const genreDropdownHandler = (value: string) => {
    setGenre(value);
  }

  const MPAADropdownHandler = (value: string) => {
    setRating(value);
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validation: ensure at least one actor name is filled in
      const hasAtLeastOneActor = actorsArray.some(actor => actor.name.trim() !== "");
      if (!hasAtLeastOneActor) {
        alert("❌ Please add at least one actor before submitting.");
        return;
      }

      // Validation: Ensure Runtime values are valid numbers
      const hours = parseInt(runTimeHours, 10);
      const minutes = parseInt(runTimeMinutes, 10);

      if (isNaN(hours) || isNaN(minutes)) {
        alert("❌ Runtime hours and minutes must be valid numbers.");
        return;
      }

      if (minutes < 0 || minutes > 59) {
        alert("❌ Runtime minutes must be between 0 and 59.");
        return;
}

      let actorsString: String = "";

      //Turn array of actors into a combined string (assigned to actorsString)
      actorsArray.forEach(function(element, index) {
        actorsString = actorsString + element.name;

        if (!(index == actorsArray.length - 1)) {
          actorsString = actorsString + ", "
        }
      });

      //Trim leading 0s of runTime strings and combine them in a formatted string.
      const hoursTrimmed = runTimeHours.replace(/^0+/, '') || "0";
      const minutesTrimmed = runTimeMinutes.replace(/^0+/, '') || "0";

      const runtimeString = `${hoursTrimmed}h ${minutesTrimmed}m`;

  
      const newMovie : Movie = {
        title: title,
        genre: genre,
        description: description,
        png: moviePosterURL,
        trailer: trailerURL,
        director: director,
        Cast: actorsString,
        Rating: rating,
        RunTime: runtimeString,
        isCurrentlyRunning: false,
      };

      console.log(newMovie);
      resetForm();
      try {
        const res = await fetch(`/api/admin/addmovie`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMovie),
        });
  
        if (!res.ok) throw new Error("Failed to add movie");
  
        alert("✅ Movie added successfully!");
      } catch (error) {
        console.error(error);
        alert("❌ Error adding movie.");
      }
    };

  const isActorsButtonDisabled = actorsArray.length >= MAX_ACTORS;
  const disableDelete = actorsArray.length == 1;

  const resetForm = () => {
  setTitle("");
  setDescription("");
  setGenre("");
  setRunTimeMinutes("");
  setRunTimeHours("");
  setRating("");
  setTrailerURL("");
  setMoviePosterURL("");
  setDirector("");
  setActorsArray([createActor()]);
};

 
  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.addMovieHeading}>Add Movie</h1>
      <hr className={styles.hr}/>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <label className={styles.label}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. The Godfather" className={styles.inputField} name="title" type="text"/>
        <label className={styles.label}>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={1500} required placeholder={sampleText} className={styles.textArea} rows={10} cols={10}></textarea>
        <label className={styles.label}>Genre</label>
        <CustomDropdown options={genreArray} value={genre} onChange={genreDropdownHandler}/>
        <label className={styles.label}>Runtime</label>
        <div className={styles.runTimeContainer}>
          <input value={runTimeHours} minLength={2} onChange={(e) => setRunTimeHours(e.target.value)} required placeholder="HH" maxLength={2} className={styles.runTimeInput} name="hour" type="text"/>
          <input value={runTimeMinutes} minLength={2} onChange={(e) => setRunTimeMinutes(e.target.value)} required placeholder="MM" maxLength={2} className={styles.runTimeInput} name="mins" type="text"/>
        </div>
        <label className={styles.label}>Rating</label>
        <CustomDropdown options={MPAARatingArray} value={rating} onChange={MPAADropdownHandler}/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Trailer URL</label>
        <input value={trailerURL} onChange={(e) => setTrailerURL(e.target.value)} required placeholder="www.youtube.com/..." className={styles.inputURL} name="trailerurl" type="url"/>
        <label className={styles.label}>Movie Poster Image URL</label>
        <input value={moviePosterURL} onChange={(e) => setMoviePosterURL(e.target.value)} required placeholder="https://i.imgur.com/..." className={styles.inputURL} name="movieposterurl" type="url"/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Director</label>
        <input value={director} onChange={(e) => setDirector(e.target.value)} required placeholder="John Doe" className={styles.inputField} name="director" type="text"/>
        <label className={styles.label}>Actors</label>
        {actorsArray.map((actor) => (
          <ActorInfoForm
            key={actor.id}
            name={actor.name}
            disableDelete={disableDelete}
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