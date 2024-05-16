//@ts-nocheck
import React from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "../../client";
import TimetableForm from "@/components/timetableForm";

const SchedulePage = async ({ params }: { params: { id: string } }) => {
    const schedule = await prisma.schedule.findFirst({
        where: { schedule_id: Number(params.id) },
    });

    return (
        <>
            <Sidebar />
            <h1 className="text-center bold">Schedule no. {params.id}</h1>
            <TimetableForm schedule={schedule} />
        </>
    );
};

export default SchedulePage;
