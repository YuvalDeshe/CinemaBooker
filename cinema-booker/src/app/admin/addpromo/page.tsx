'use client';

import { useState } from "react";
import styles from "./styles.module.css"
import DateInputForm from "@/app/components/DateInputForm";

export default function AddMovie() {

  type PromoCode = {
    name: String,
    priceMultiplier: Number,
    startDate: String,
    endDate: String,
  }

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

  
      const newPromoCode : PromoCode = {
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
      <h1 className={styles.addMovieHeading}>Add Promo</h1>
      <hr className={styles.hr}/>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <label className={styles.label}>Promo Name</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. The Godfather" className={styles.inputField} name="title" type="text"/>
        <label className={styles.label}>Discount (%)</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. The Godfather" className={styles.inputField} name="title" type="text"/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Promo Start Date</label>
        <DateInputForm/>
        <label className={styles.label}>Promo End Date</label>
        <DateInputForm/>
        <hr className={styles.hr}/>
        <input className={styles.submitButton} type="submit" value="Submit"/>
      </form>
    </div>
  );
}