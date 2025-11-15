import { useState } from "react";
import { Movie, MovieModel } from "@/models/MovieModel";
import { Actor, createActor } from "@/models/ActorModel";
import { useRouter } from "next/navigation";

export function checkForOneActor(actors: Actor[]) {
  const hasAtLeastOneActor = actors.some(actor => actor.name.trim() !== "");
      if (!hasAtLeastOneActor) {
        throw new Error("❌ Please add at least one actor before submitting.")
      } 
}

export function validateTimeValues(hoursStr: string, minutesStr: string) {
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("❌ Runtime hours and minutes must be valid numbers.")
    }

    if (minutes < 0 || minutes > 59) {
        throw new Error("❌ Runtime minutes must be between 0 and 59.")
    }
}

export function combineActors(actors: Actor[]) : string {
    let actorsString: string = "";
    actors.forEach(function(element, index) {
        actorsString = actorsString + element.name;

        if (!(index == actors.length - 1)) {
          actorsString = actorsString + ", "
        }
    });
    return actorsString;
}

export function formatRuntime(hours: string, mins: string) : string {
    const hoursTrimmed = hours.replace(/^0+/, '') || "0";
    const minutesTrimmed = mins.replace(/^0+/, '') || "0";
    const runtimeString = `${hoursTrimmed}h ${minutesTrimmed}m`;
    return runtimeString;
}

export async function submitMovie(movie: Movie) {
    try {
        const res = await fetch(`/api/admin/addmovie`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie),
        });
    
        if (!res.ok) throw new Error("Failed to add movie");
    
        alert("✅ Movie added successfully!");
    } catch (error) {
        console.error(error);
        alert("❌ Error adding movie.");
    }
}


export function useAddMovieController() {
  const router = useRouter();

  // All useState logic stays here (controller-side)
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

  const MAX_ACTORS = 8;

  // Add/remove actors
  const onActorAdd = () => {
    setActorsArray(prev => (
      prev.length >= MAX_ACTORS ? prev : [...prev, createActor()]
    ));
  };

  const onActorDelete = (id: string) => {
    setActorsArray(prev => prev.filter(a => a.id !== id));
  };

  // Submit handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      checkForOneActor(actorsArray);
      validateTimeValues(runTimeHours, runTimeMinutes);

      const actorsString = combineActors(actorsArray);
      const runtimeString = formatRuntime(runTimeHours, runTimeMinutes);

      const newMovie = new MovieModel({
        title,
        genre,
        description,
        png: moviePosterURL,
        trailer: trailerURL,
        director,
        cast: actorsString,
        rating,
        runtime: runtimeString,
        isCurrentlyRunning: false,
      });

      await submitMovie(newMovie);
      router.push('/');

    } catch (err) {
      alert(err);
    }
  };

  return {
    // Expose everything needed by the component
    title, setTitle,
    description, setDescription,
    genre, setGenre,
    runTimeMinutes, setRunTimeMinutes,
    runTimeHours, setRunTimeHours,
    rating, setRating,
    trailerURL, setTrailerURL,
    moviePosterURL, setMoviePosterURL,
    director, setDirector,
    actorsArray, setActorsArray,
    onActorAdd,
    onActorDelete,
    onSubmit,
    MAX_ACTORS,
  };
}
