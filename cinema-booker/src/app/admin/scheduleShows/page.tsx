'use client';
import ScheduleShowsForm from "@/app/components/ScheduleShowsForm";
import { useScheduleShowsController } from '@/controllers/ScheduleShowsController';

export default function ScheduleShows() {
    const { controller, error, setError } = useScheduleShowsController();

    // make this pretty perhaps
    return (
        <div>
            <ScheduleShowsForm handleSubmit={controller.scheduleShow.bind(controller)} error={error} setError={setError}></ScheduleShowsForm>
        </div>
    );
}