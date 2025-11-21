type Show = {
    movieID: string,
    showRoomID: string,
    time: number,
    date: string
}

export default class ScheduleShowsModel {
    // Validate date string (YYYY-MM-DD) and time (hour number)
    static validateDate(date: string, time: number) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const currentTime = currentDate.getHours();

        const providedYear = Number(date.slice(0, 4));
        const providedMonth = Number(date.slice(5, 7));
        const providedDay = Number(date.slice(8));

        if (Number.isNaN(providedYear) || Number.isNaN(providedMonth) || Number.isNaN(providedDay)) {
            throw new Error('Invalid date format');
        }

        if (providedYear < year) {
            throw new Error('Invalid date: Selected year has already passed');
        } else if (providedYear === year) {
            if (providedMonth < month) {
                throw new Error('Invalid date: Selected month has already passed');
            } else if (providedMonth === month) {
                if (providedDay < day) {
                    throw new Error('Invalid date: Selected day has already passed');
                } else if (providedDay === day) {
                    if (currentTime > time) {
                        throw new Error('Invalid time: Selected time has already passed');
                    }
                }
            }
        }

        const formattedMonth = String(providedMonth).length === 1 ? `0${providedMonth}` : `${providedMonth}`;
        const formattedDay = String(providedDay).length === 1 ? `0${providedDay}` : `${providedDay}`;

        return `${formattedMonth}/${formattedDay}/${providedYear}`; // MM/DD/YYYY
    }

    // Fetch all shows from API
    static async fetchAllShows(): Promise<Show[]> {
        const response = await fetch('/api/shows');
        if (!response.ok) throw new Error('Failed to fetch shows');
        const data = await response.json();
        return data as Show[];
    }

    // Check whether the given time slot is free in the given showRoom
    static async isTimeSlotAvailable(showRoomId: string, time: number, date: string): Promise<boolean> {
        const allShows = await ScheduleShowsModel.fetchAllShows();
        if (!allShows || allShows.length === 0) return true;
        for (const s of allShows) {
            if (s.showRoomID == showRoomId && s.time == time && s.date == date) return false;
        }
        return true;
    }

    // Add show to DB
    static async addShow(showPayload: any) {
        const response = await fetch('/api/shows', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(showPayload),
        });
        let data = null;
        try {
            data = await response.json();
        } catch (e) {
            // ignore parse errors
        }
        if (!response.ok) {
            const msg = data?.message ?? 'Unknown error';
            throw new Error(msg);
        }
        return data;
    }

    // Update movie to set isCurrentlyRunning
    static async setMovieRunning(movieId: string) {
        const moviePayload = { isCurrentlyRunning: true };
        const res = await fetch(`/api/movies/${movieId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(moviePayload),
        });
        if (!res.ok) throw new Error('Failed to update movie');
        return true;
    }
}
