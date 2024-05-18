import prisma from "@/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name: string = searchParams.get("name")!;
    const lat: number = +searchParams.get("lat")!;
    const lon: number = +searchParams.get("lon")!;
    if (!name || !lat || !lon) {
        return NextResponse.json({ message: "Missing name, latitude or longitude", status: 400 });
    }

    try {
        await prisma.$queryRaw`INSERT INTO stations (name, latitude, longitude) VALUES (${name}, ${lat}, ${lon})`;
        return NextResponse.json({ message: "Station registered successfully!", status: 200 });
    } catch (e: any) {
        const errorMessage = e.message.split('ERROR:').at(-1).trim().replace(/`/g, '');
        console.log(e.message);
        return NextResponse.json({ message: errorMessage, status: 500 });
    }
}

export const dynamic = 'force-dynamic';
