//@ts-nocheck
import prisma from "@/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const stationNames: string[] = searchParams.get("station_names").split(',');
    const departureTime: string = searchParams.get("starting_time");
    const capsuleType: string = searchParams.get("capsule_type");
    const bothWays: boolean = Boolean(searchParams.get("both_ways"));

    if (!stationNames || !departureTime || !capsuleType || !bothWays) {
        return NextResponse.json({
            message: "Missing stationNames, departureTime, capsuleType or bothWays",
            status: 400
        });
    }

    try {
        await prisma.$queryRaw`CALL add_schedule(${stationNames}, CAST(${departureTime} AS TIME), ${capsuleType}, CAST(${bothWays} AS BOOLEAN))`;
        return NextResponse.json({ message: "Schedule added successfully", status: 200 });
    } catch (e: any) {
        const errorMessage = e.message.split('ERROR:').at(-1).trim().replace(/`/g, '');
        console.log(e.message);
        return NextResponse.json({ message: errorMessage, status: 500 });
    }
}

export const dynamic = 'force-dynamic';
