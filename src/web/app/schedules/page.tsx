import React from "react";
import "../globals.css";
import Schedule from "@/components/schedule";
import prisma from "@/client"
import AddScheduleForm from "@/components/addScheduleForm";

const Schedules = async () => {
    const schedules = (await prisma.schedule.findMany())
        .sort((s1, s2) => s1.schedule_id - s2.schedule_id)
        .map((s) => <Schedule key={s.schedule_id} {...s} />);

    return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold pb-5'>Schedules</h1>
            <AddScheduleForm />
            <div className="hyperloop-grid">
                {schedules};
            </div>
        </div>
    );
};

export default Schedules;

export const dynamic = 'force-dynamic';
