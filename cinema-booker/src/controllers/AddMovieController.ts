import { Movie } from "@/models/MovieModel";
import { Actor } from "@/models/ActorModel";

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
