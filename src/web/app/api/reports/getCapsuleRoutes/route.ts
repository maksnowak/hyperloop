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
    return await prisma.trips_history.findMany({
        where: {
            referred_capsule_id: id
        },
        select: {
            ride_id: true,
            date_start: true,
            date_end: true,
            tubes: {
                select: {
                    stations_tubes_starting_station_idTostations: {
                        select: {
                            name: true
                        }
                    },
                    stations_tubes_ending_station_idTostations: {
                        select: {
                            name: true
                        }
                    }
                }
            },
        },
        orderBy: {
            date_start: 'asc'
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}
