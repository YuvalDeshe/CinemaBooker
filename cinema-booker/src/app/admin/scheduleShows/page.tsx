'use client';
import ScheduleShowsForm, { Movie, ShowRoom } from "@/app/components/ScheduleShowsForm";
import { useState } from "react";

type Show = {
    movieID: String,
    showRoomID: String,
    time: number,
    date: string
}

export default function ScheduleShows() {
    const [error, setError] = useState<string>("");

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

            // confirm that the selected time slot is available in the selected showroom
            const ensureGoodTimeSlot = async () => {
                // fetch shows from the DB
                // TODO: move this to its own Data Access class to adhere to the MVC framework
                let allShows: Show[];
                try {
                    const response = await fetch("/api/shows");
                    if (!response.ok) {
                        throw new Error("Failed to fetch movies.");
                    }
                    const data = await response.json();
                    allShows = data;
                    console.log('allShows: ', allShows);
                    if (allShows.length == 0) { // if no shows are in the DB
                        console.log('No shows in the DB, time slot is OK');
                        return true;
                    }
                    for (const element of allShows) {
                        console.log('show: ', element);
                        console.log(`new vs current roomID: ${element.showRoomID} | ${showRoom._id} | equal? ${element.showRoomID == showRoom._id}`)
                        console.log(`new vs current time: ${element.time} | ${time} | equal? ${element.time == time}`)
                        console.log(`new vs current date: ${element.date} | ${showDate} | equal? ${element.date == showDate}`)
                        if (element.showRoomID == showRoom._id && element.time == time && element.date == showDate) {
                            console.log('Conflicting time found in the DB');
                            return false;
                        }
                    };
                    console.log('No time conflict');
                    return true;
                } catch (e) {
                    setError(String(e));
                    console.error(e);
                    console.log('Encountered an error, not scheduleing movie');
                    return false;
                }

            }
            const goodTimeSlot = await ensureGoodTimeSlot(); // boolean
            console.log('goodTimeSlot?', goodTimeSlot)
            if (!goodTimeSlot) throw new Error('Chosen time slot is already booked in the selected theater');

            // create an array of seats where none of them are booked
            const seats = new Array(showRoom.numSeats).fill(false);

            // add the show to the database
            // TODO: move this function to a separate Data Access class to adhere to MVC framework
            async function addShowToDB() {
                try {
                    if (movie === undefined) throw new Error('Movie is undefined');
                    if (showRoom === undefined) throw new Error('ShowRoom is undefined');
                    const showPayload = {
                        movieID: movie._id,
                        showRoomID: showRoom._id,
                        movieTitle: movieTitle, // added for clarity when looking at DB
                        showRoomName: showRoom.roomName, // added for clarity when looking at DB
                        time: time, // stored in 24 hour time, hour only (e.g. 3PM = 15)
                        date: showDate, // MM/DD/YYYY
                        seatReservationArray: seats,
                    }
                    console.log('showPayload: ', showPayload);
                    const response = await fetch('/api/shows', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(showPayload),
                    });

                    // Attempt to parse JSON only when there is a body
                    let data = null;
                    try {
                        data = await response.json();
                    } catch (error_) {
                        console.warn('No JSON body returned from /api/shows or invalid JSON', error_);
                    }

                    if (response.ok) {
                        console.log('scheduleShows page success');
                        console.log("Show scheduling successful!", data);
                        // return true so callers can await this function
                        globalThis.location.href = '/admin';
                        return true;
                    } else {
                        const msg = data?.message ?? 'Unknown error';
                        console.error("Show scheduling failed:", msg);
                        setError(msg);
                        return false;
                    }
                } catch (e) {
                    setError(String(e));
                    console.error("Network or unexpected error during Show scheduling:", e);
                    return false;
                }
            }

            async function updateMovieRunning() {
                if (movie === undefined) throw new Error('Movie is undefined');
                const moviePayload = {
                    isCurrentlyRunning: true
                }
                try {
                    const res = await fetch(`/api/movies/${movie._id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(moviePayload),
                    });
                    if (!res.ok) throw new Error("Failed to update movie");
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }

            }

            // Await the DB add first to ensure the POST completes before updating the movie
            const added = await addShowToDB();
            if (added) {
                if (!movie.isCurrentlyRunning) await updateMovieRunning();
            } else {
                console.error('Show was not added to DB; skipping movie update.');
            }

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