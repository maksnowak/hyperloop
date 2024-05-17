import prisma from "../../../client";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id: number = +searchParams.get("station_id")!;
    if (!id) {
        return NextResponse.json({message: "Missing station id", status: 400 });
    }

    try {
        const data = await prisma.$queryRaw`SELECT name FROM stations s1 WHERE NOT EXISTS (
            SELECT * FROM tubes WHERE starting_station_id = ${id} AND ending_station_id = s1.station_id
        ) AND s1.station_id != ${id}`;
        return NextResponse.json({data: data, message: "", status: 200 });
    } catch (e: any) {
        const errorMessage = e.message.split('ERROR:').at(-1).trim().replace(/`/g, '');
        console.log(e.message);
        return NextResponse.json({data: [], message: errorMessage, status: 500 });
    }
}

export const dynamic = 'force-dynamic';