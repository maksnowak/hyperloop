import prisma from "../../../client";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name1: string = searchParams.get("station1_name")!;
    const name2: string = searchParams.get("station2_name")!;
    if (!name1 || !name2) {
        return NextResponse.json({message: "Missing one of the station names", status: 400 });
    }

    try {
        await prisma.$queryRaw`CALL connect_stations(${name1}, ${name2}, 1200)`;
        return NextResponse.json({message: "Stations connected successfully!", status: 200 });
    } catch (e: any) {
        const errorMessage = e.message.split('ERROR:').at(-1).trim().replace(/`/g, '');
        console.log(e.message);
        return NextResponse.json({message: errorMessage, status: 500 });
    }
}

export const dynamic = 'force-dynamic';