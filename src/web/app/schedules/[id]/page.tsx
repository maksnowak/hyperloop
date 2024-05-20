//@ts-nocheck
import React from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "@/client";
import TimetableForm from "@/components/timetableForm";

const SchedulePage = async ({ params }: { params: { id: string } }) => {
    const schedule = await prisma.schedule.findFirst({
        where: { schedule_id: Number(params.id) },
    });

    return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold pb-5'>Schedule no. {params.id}</h1>
            <TimetableForm schedule={schedule} />
        </div>
    );
};

export default SchedulePage;
