'use client';
import { useState, useEffect } from "react";

type ScheduleShowsFormProps = {
    handleSubmit: (data: FormData) => void
    error: string;
    setError: (genres: string) => void;
}

// TODO: expand types; import these types from their individual files
type Movie = {
    title: string;
    genre: string[];
    posterUrl: string;
    isCurrentlyRunning: boolean;
    _id: string;
};

type ShowRoom = {
    roomName: string;
    numSeats: number;
}

export default function ScheduleShowsForm({ handleSubmit, error, setError }: ScheduleShowsFormProps) {

    const [movies, setMovies] = useState<string[]>([]);
    const [showRooms, setShowRooms] = useState<ShowRoom[]>([]);

    // TODO: move this to its own DataAccess class to uphold MVC framework
    useEffect(() => {
        // fetch the list of movies to send to the MovieDropdown
        const fetchMovies = async () => {
            try {
                const response = await fetch("/api/movies");
                if (!response.ok) {
                    throw new Error("Failed to fetch movies.");
                }
                const data = await response.json();
                setMovies(data.map((movie: Movie) => movie.title));
            } catch (err) {
                setError(String(err));
                console.error(err);
            }
        };

        const fetchShowRooms = async () => {
            try {
                const response = await fetch("/api/showRooms");
                if (!response.ok) {
                    throw new Error("Failed to fetch showRooms.");
                }
                const data = await response.json();
                setShowRooms(data);
            } catch (err) {
                setError(String(err));
                console.error(err);
            }
        }

        fetchMovies();
        fetchShowRooms();
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // error handling is in the ScheduleShows method on the scheduleShows page.
        e.preventDefault();
        try {
            const form = e.currentTarget;
            const data = new FormData(form);

            handleSubmit(data);
        } catch (err) {
            setError(String(err));
            console.error('Registration', err);
        }
    }
    return (
        // TODO: add input for showroom
        // make this pretty if we think we need to
        // JSX was copied from RegisterForm and changed for the purposes of schedule show
        <div className="flex justify-center">
            <form onSubmit={onSubmit} className="space-y-6">
                {/* movie selector */}
                <div>
                    <label htmlFor="movie" className="block mb-1 text-gray-300">Movie</label>
                    <select className="bg-white text-black w-full p-3 rounded-md" name="movie" id="movie" required>Choose a movie:
                        {/* create a dropdown option for each movie in the DB */}
                        {movies.map((movie) => (
                            <option key={movie} value={movie}>{movie}</option>
                        ))}
                    </select>
                </div>

                {/* ShowRoom selector */}
                <div>
                    <label htmlFor="showRoom" className="block mb-1 text-gray-300">Showroom</label>
                    <select className="bg-white text-black w-full p-3 rounded-md" name="showRoom" id="showRoom" required>Choose a showroom:
                        {/* create a dropdown option for each showroom in the DB */}
                        {showRooms.map((showRoom) => (
                            <option key={showRoom.roomName} value={showRoom.roomName}>{`${showRoom.roomName} (${showRoom.numSeats} seats)`}</option>
                        ))}
                    </select>
                </div>

                {/* date selector */}
                <div>
                    <label htmlFor="date" className="block mb-1 text-gray-300">Date</label>
                    <input
                        id="date" name="date" required type="date"
                        className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* time selector */}
                <div>
                    <label htmlFor="time" className="block mb-1 text-gray-300">Time</label>
                    <select className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" name="showRoom" id="showRoom" required>Choose a showroom:
                        <option value="9am">9:00 A.M.</option>
                        <option value="12pm">12:00 P.M.</option>
                        <option value="3pm">3:00 P.M.</option>
                        <option value="6pm">6:00 P.M.</option>
                        <option value="9pm">9:00 P.M.</option>
                    </select>
                </div>


                {/* display the error message if something goes wrong */}
                {error && (
                    <label className="text-red-400 mb-2">{error}</label>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-md transition-all duration-200"
                >
                    Schedule Show
                </button>
            </form>
        </div>
    );
}