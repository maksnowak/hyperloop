import prisma from "@/app/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const departureTime: string = searchParams.get("departure_time")!;
    const arrivalTime: string = searchParams.get("departure_time")!;
    // @ts-ignore
    const capsule: number = searchParams.get("capsule")!;
    // current_station_id: number;
    // next_station_id: number;
    // previous_schedule_id: number | null;
    if (!departureTime || !arrivalTime || !capsule) {
        return NextResponse.json({
            message: "Missing departure time, arrival time or capsule",
            status: 400
        });
    }

    try {
        await prisma.$queryRaw`CALL add_schedule(${departureTime}, ${arrivalTime}, CAST(${capsule} AS INTEGER))`;
        return NextResponse.json({ message: "Schedule added successfully", status: 200 });
    } catch (e: any) {
        const errorMessage = e.message.split('ERROR:').at(-1).trim().replace(/`/g, '');
        console.log(e.message);
        return NextResponse.json({ message: errorMessage, status: 500 });
    }
}
