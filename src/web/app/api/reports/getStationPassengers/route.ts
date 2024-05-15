import { NextRequest, NextResponse } from "next/server";
import prisma from "@/client";

type ReposnseData = {
    data: Object[];
}

export async function GET(req: NextRequest) {
    let id;
    // check if a valid id is provided
    try {
        id = req.nextUrl.searchParams.get('id');
        if (!id) {
            throw new Error('No id provided');
        }
        id = Number(id);
    } catch (error) {
        return NextResponse.error();
    }
    return await prisma.station_logs.findMany({
        where: {
            referred_station_id: id
        },
        select: {
            log_id: true,
            date: true,
            passengers_served: true
        },
        orderBy: {
            date: 'asc'
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}
