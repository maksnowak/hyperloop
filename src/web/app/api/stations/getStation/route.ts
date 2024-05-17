import prisma from "@/client";
import {NextResponse} from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id: number = +searchParams.get("station_id")!;
    if (!id) {
        return NextResponse.json({data: [], message: "Missing station_id", status: 400 });
    }

    try {
        const arrival = await prisma.stations.findFirst({
            where: {
                station_id: id
            }
        });
        return NextResponse.json({ data: arrival, message: "", status: 200 });
    } catch (e: any) {
        const errorMessage = e.message.split('ERROR:').at(-1).trim().replace(/`/g, '');
        console.log(e.message);
        return NextResponse.json({data: [], message: errorMessage, status: 500 });
    }
}

export const dynamic = 'force-dynamic';