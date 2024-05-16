import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import Schedule from "@/components/schedule";
import prisma from "../client"
import AddScheduleForm from "@/components/addScheduleForm";

const Schedules = async () => {
    const schedules = (await prisma.schedule.findMany())
        .sort((s1, s2) => s1.schedule_id - s2.schedule_id)
        .map((s) => <Schedule key={s.schedule_id} {...s} />);

    return (
        <>
            <h1 className="text-center">Schedules</h1>
            <Sidebar />
            <AddScheduleForm />
            <div className="hyperloop-grid">
                {schedules};
            </div>
        </>
    );
};

export default Schedules;

export const dynamic = 'force-dynamic';
