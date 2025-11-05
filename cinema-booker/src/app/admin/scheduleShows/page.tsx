'use client';
import ScheduleShowsForm from "@/app/components/ScheduleShowsForm";
import { useState } from "react";


export default function ScheduleShows() {
    const [error, setError] = useState<string>("");

    /* TODO: add functionality 
        - add the show to the DB
        - if the movie is not currently running, set isCurrentlyRunning to true in the DB
        - make sure date & time are in the future
        */
    function scheduleShow(data: FormData) {
        console.log('schedule show function');
        console.log('data: ', data);

        const movie = String(data.get('movie') ?? '').trim();
        const date = String(data.get('date') ?? '').trim();
        const time = String(data.get('time') ?? '').trim();
        if (movie === "") throw new Error("No movie selected");
    }

    // make this pretty perhaps
    return (
        <div>
            <ScheduleShowsForm handleSubmit={scheduleShow} error={error} setError={setError}></ScheduleShowsForm>
        </div>
    );
}