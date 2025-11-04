'use client';

import styles from "./styles.module.css"
import ActorInfoForm from "@/app/components/ActorInfoForm";

export default function EditProfile() {

  const sampleText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...";
  const genreArray: string[] = ["Action", "Adventure", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];
  const MPAARatingArray: string[] = ["G", "PG", "PG-13", "R"];
 
  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.addMovieHeading}>Add Movie</h1>
      <hr className={styles.hr}/>
      <form className={styles.formContainer}>
        <label className={styles.label}>Title</label>
        <input required placeholder="e.g. The Godfather" className={styles.inputField} name="title" type="text"/>
        <label className={styles.label}>Description</label>
        <textarea maxLength={1500} required placeholder={sampleText} className={styles.textArea} rows={10} cols={10}></textarea>
        <label className={styles.label}>Genre</label>
         {/**Genre Dropdown Component Here*/}
        <label className={styles.label}>Runtime</label>
        <div className={styles.runTimeContainer}>
          <input required placeholder="HH" maxLength={2} className={styles.runTimeInput} name="hour" type="text"/>
          <input required placeholder="MM" maxLength={2} className={styles.runTimeInput} name="mins" type="text"/>
        </div>
        <label className={styles.label}>Rating</label>
        {/**Should be a dropdown, delete below input field*/}
        <input className={styles.inputField} name="rating" type="text"/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Trailer URL</label>
        <input required placeholder="www.youtube.com/..." className={styles.inputURL} name="trailerurl" type="url"/>
        <label className={styles.label}>Movie Poster Image URL</label>
        <input required placeholder="https://i.imgur.com/..." className={styles.inputURL} name="movieposterurl" type="url"/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Director</label>
        <input required placeholder="John Doe" className={styles.inputField} name="director" type="text"/>
        <label className={styles.label}>Actors</label>
        <ActorInfoForm/>
        <button className={styles.addActor}>Add Actor</button>
        <hr className={styles.hr}/>
        <input className={styles.submitButton} type="submit" value="Submit"/>
      </form>
    </div>
  );
}