import ScheduleShowsModel from '@/models/ScheduleShowsModel';
import { Dispatch, SetStateAction, useState } from 'react';
import type { Movie, ShowRoom } from '@/app/components/ScheduleShowsForm';

export default class ScheduleShowsController {
    private readonly setError?: Dispatch<SetStateAction<string>>;

    constructor(setError?: Dispatch<SetStateAction<string>>) {
        this.setError = setError;
    }

    async scheduleShow(data: FormData, movies: Movie[], showRooms: ShowRoom[]) {
        try {
            const movieTitle: string = String(data.get('movie') ?? '').trim();
            const date = String(data.get('date') ?? '').trim();
            const time = Number(data.get('time') ?? '');
            const selectedShowRoom = String(data.get('showRoom') ?? '').trim();

            if (movieTitle === '') throw new Error('No movie selected');
            const movie = movies.find(m => m.title === movieTitle);
            if (!movie) throw new Error('Could not find Movie correlated to selected movie');

            const showRoom = showRooms.find(r => r.roomName === selectedShowRoom);
            if (!showRoom) throw new Error('Could not find ShowRoom correlated to selected showroom');

            const showDate = ScheduleShowsModel.validateDate(date, time);

            const available = await ScheduleShowsModel.isTimeSlotAvailable(String(showRoom._id), time, showDate);
            if (!available) throw new Error('Chosen time slot is already booked in the selected theater');

            const seats = new Array(showRoom.numSeats).fill(false);

            const showPayload = {
                movieID: movie._id,
                showRoomID: showRoom._id,
                movieTitle: movieTitle,
                showRoomName: showRoom.roomName,
                time: time,
                date: showDate,
                seatReservationArray: seats,
            };

            await ScheduleShowsModel.addShow(showPayload);

            if (!movie.isCurrentlyRunning) {
                try {
                    await ScheduleShowsModel.setMovieRunning(movie._id);
                } catch (e) {
                    console.error('Failed to update movie running flag', e);
                }
            }

            // On success redirect
            globalThis.location.href = '/admin';
            return true;
        } catch (e: any) {
            const msg = String(e?.message ?? e ?? 'Unknown error');
            if (this.setError) this.setError(msg);
            console.error(e);
            return false;
        }
    }
}

// React hook that owns the error state and provides a controller instance
export function useScheduleShowsController() {
    const [error, setError] = useState<string>('');
    const controller = new ScheduleShowsController(setError);
    return { controller, error, setError } as {
        controller: ScheduleShowsController;
        error: string;
        setError: Dispatch<SetStateAction<string>>;
    };
}
