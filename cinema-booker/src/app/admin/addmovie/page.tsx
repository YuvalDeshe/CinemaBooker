'use client';

import { genreArray, MPAARatingArray } from "@/models/MovieModel";
import { useAddMovieController } from "@/controllers/AddMovieController";
import styles from "./styles.module.css"
import ActorInfoForm from "@/app/components/ActorInfoForm";
import CustomDropdown from "@/app/components/CustomDropdown";

export default function AddMovie() {
  const c = useAddMovieController();

  const sampleText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...";
 
  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.addMovieHeading}>Add Movie</h1>
      <hr className={styles.hr}/>
      <form className={styles.formContainer} onSubmit={c.onSubmit}>
        <label className={styles.label}>Title</label>
        <input value={c.title} onChange={(e) => c.setTitle(e.target.value)} required placeholder="e.g. The Godfather" className={styles.inputField} name="title" type="text"/>
        <label className={styles.label}>Description</label>
        <textarea value={c.description} onChange={(e) => c.setDescription(e.target.value)} maxLength={1500} required placeholder={sampleText} className={styles.textArea} rows={10} cols={10}></textarea>
        <label className={styles.label}>Genre</label>
        <CustomDropdown options={genreArray} value={c.genre} onChange={value => c.setGenre(value)}/>
        <label className={styles.label}>Runtime</label>
        <div className={styles.runTimeContainer}>
          <input value={c.runTimeHours} minLength={2} onChange={(e) => c.setRunTimeHours(e.target.value)} required placeholder="HH" maxLength={2} className={styles.runTimeInput} name="hour" type="text"/>
          <input value={c.runTimeMinutes} minLength={2} onChange={(e) => c.setRunTimeMinutes(e.target.value)} required placeholder="MM" maxLength={2} className={styles.runTimeInput} name="mins" type="text"/>
        </div>
        <label className={styles.label}>Rating</label>
        <CustomDropdown options={MPAARatingArray} value={c.rating} onChange={value => c.setRating(value)}/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Trailer URL</label>
        <input value={c.trailerURL} onChange={(e) => c.setTrailerURL(e.target.value)} required placeholder="https://www.youtube.com/..." className={styles.inputURL} name="trailerurl" type="url"/>
        <label className={styles.label}>Movie Poster Image URL</label>
        <input value={c.moviePosterURL} onChange={(e) => c.setMoviePosterURL(e.target.value)} required placeholder="https://i.imgur.com/..." className={styles.inputURL} name="movieposterurl" type="url"/>
        <hr className={styles.hr}/>
        <label className={styles.label}>Director</label>
        <input value={c.director} onChange={(e) => c.setDirector(e.target.value)} required placeholder="John Doe" className={styles.inputField} name="director" type="text"/>
        <label className={styles.label}>Actors</label>
        {c.actorsArray.map((actor) => (
          <ActorInfoForm
            key={actor.id}
            name={actor.name}
            disableDelete={c.actorsArray.length === 1}
            onChange={(actorName: string) => {
              c.setActorsArray(prev =>
                prev.map(a => a.id === actor.id ? { ...a, name: actorName } : a)
              );
            }}
            onDelete={() => c.onActorDelete(actor.id)}
          />
        ))}
        <button disabled={c.actorsArray.length >= c.MAX_ACTORS} type="button" onClick={c.onActorAdd} className={c.actorsArray.length >= c.MAX_ACTORS ? (styles.addActorDisabled) : (styles.addActor)}>Add Actor</button>
        <hr className={styles.hr}/>
        <input className={styles.submitButton} type="submit" value="Submit"/>
      </form>
    </div>
  );
}