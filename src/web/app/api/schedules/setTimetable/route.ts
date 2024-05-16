import prisma from "../../../client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const scheduleId: number = Number(searchParams.get("schedule_id")!);
    const departureTime: string = searchParams.get("newDepartureTime")!;
    const arrivalTime: string = searchParams.get("newArrivalTime")!;

    if (departureTime == "" && arrivalTime == "") {
        return NextResponse.json({
            message: "Cannot change the timetable with the same times",
            status: 400
        });
    }

    try {
        if (departureTime != "") {
            await prisma.$queryRaw`UPDATE schedule SET departure_time=CAST(${departureTime} AS TIME) WHERE schedule_id=${scheduleId}`;
        }

        if (arrivalTime != "") {
            await prisma.$queryRaw`UPDATE schedule SET arrival_time=CAST(${arrivalTime} AS TIME) WHERE schedule_id=${scheduleId}`;
        }

        return NextResponse.json({
            message: `Succesfully updated schedule no. ${scheduleId}`,
            status: 200
        });
    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({ message: e.message, status: 500 });
    }
}

export const dynamic = 'force-dynamic';