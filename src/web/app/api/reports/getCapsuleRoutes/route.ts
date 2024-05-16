import { NextRequest, NextResponse } from "next/server";
import prisma from "@/client";
import validateParams from "@/app/api/validateParams";

type ReposnseData = {
    data: Object[];
}

export async function GET(req: NextRequest) {
    let id, from, to;
    try {
        const params = validateParams(req.nextUrl.searchParams.get('id'), req.nextUrl.searchParams.get('from'), req.nextUrl.searchParams.get('to'));
        id = params.id;
        from = params.from;
        to = params.to;
    } catch (error) {
        return NextResponse.error();
    }
    return await prisma.trips_history.findMany({
        where: {
            referred_capsule_id: id,
            AND: [
                {
                    date_start: {
                        gte: from
                    }
                },
                {
                    date_end: {
                        lte: to
                    }
                }
            ]
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

export const dynamic = 'force-dynamic';