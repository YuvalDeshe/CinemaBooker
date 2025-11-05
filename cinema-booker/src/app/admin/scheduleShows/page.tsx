'use client';
import ScheduleShowsForm from "@/app/components/ScheduleShowsForm";
import { useState } from "react";
import { Movie, ShowRoom } from "@/app/components/ScheduleShowsForm";

export default function ScheduleShows() {
    const [error, setError] = useState<string>("");

    /* TODO: add functionality 
        - add the show to the DB
        - if the movie is not currently running, set isCurrentlyRunning to true in the DB
        - make sure date & time are in the future
        */
    async function scheduleShow(data: FormData, movies: Movie[], showRooms: ShowRoom[]) {
        try {
            // console.log('schedule show function');
            console.log('data: ', data);

            const movieTitle: String = String(data.get('movie') ?? '').trim();
            const date = String(data.get('date') ?? '').trim();
            const time = Number(data.get('time') ?? '');
            const selectedShowRoom = String(data.get('showRoom') ?? '').trim();


            if (movieTitle === "") throw new Error("No movie selected");
            const movie = movies.find(movie => movie.title === movieTitle);
            if (!movie || movie === undefined) throw new Error('Could not find Movie correlated to selected movie');

            const showRoom = showRooms.find(room => room.roomName === selectedShowRoom);
            if (!showRoom || showRoom === undefined) throw new Error('Could not find ShowRoom correlated to selected showroom');

            const validateDate = () => {
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1;
                const day = currentDate.getDate();
                const currentTime = currentDate.getHours();

                // date is formatted YYYY-MM-DD
                const providedYear = Number(date.slice(0, 4));
                const providedMonth = Number(date.slice(5, 7));
                const providedDay = Number(date.slice(8));

                if (providedYear < year) {
                    throw new Error('Invalid date: Selected year has already passed');
                } else if (providedYear == year) { // ensure month is valid if selected year is this year
                    if (providedMonth < month) {
                        throw new Error('Invalid date: Selected month has already passed');
                    } else if (providedMonth == month) { // ensure day is valid if selected month is this month
                        if (providedDay < day) {
                            throw new Error('Invalid date: Selected day has already passed');
                        } else if (providedDay == day) { // ensure time is valid if selected day is today
                            if (currentTime > time && providedDay == day) {
                                throw new Error('Invalid time: Selected time has already passed');
                            }
                        }
                    }
                }

                console.log('Valid date entered');

                const formattedMonth = String(providedMonth).length == 1 ? `0${providedMonth}` : `${providedMonth}`
                const formattedDay = String(providedDay).length == 1 ? `0${providedDay}` : `${providedDay}`

                return `${formattedMonth}/${formattedDay}/${providedYear}`;
            }

            const showDate = validateDate();
            console.log('showDate ', showDate);

            // create an array of seats where none of them are booked
            const seats = new Array(showRoom.numSeats).fill(false);

            /*
                Since showrooms and movies were pulled from the DB, assume their
                values are valid. If either isn't found in the DB, the api route
                should throw an error. 
     
                The admin interacting with the form doesn't have that much input
                regarding what data they enter, so they shouldn't be able to enter
                too much incorrect data. However, we can add more data validation
                later if need be.
            */


            // add the show to the database
            // TODO: move this function to a separate Data Access class to adhere to MVC framework
            async function addShowToDB() {
                try {
                    if (movie === undefined) throw new Error('Movie is undefined');
                    if (showRoom === undefined) throw new Error('ShowRoom is undefined');
                    const showPayload = {
                        movieID: movie._id,
                        showRoomID: showRoom._id,
                        time: time, // stored in 24 hour time, hour only (e.g. 3PM = 15)
                        date: showDate, // MM/DD/YYYY
                        seatReservationArray: seats,
                    }
                    const response = await fetch('/api/shows', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(showPayload),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        console.log('scheduleShows page success');
                        console.log("Show scheduling successful!", data);
                        window.location.href = '/admin';

                    } else {
                        console.error("Show scheduling failed:", data.message);
                    }
                } catch (e) {
                    setError(String(e));
                    console.error("Network or unexpected error during Show scheduling:", error);
                }
            }

            addShowToDB();

        } catch (e) {
            setError(String(e));
            console.error(e);
        }
    }

    // make this pretty perhaps
    return (
        <div>
            <ScheduleShowsForm handleSubmit={scheduleShow} error={error} setError={setError}></ScheduleShowsForm>
        </div>
    );
}