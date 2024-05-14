import { NextResponse } from "next/server";
import prisma from "@/client";

type ReposnseData = {
    data: Object[];
}

export async function GET() {
    return await prisma.trips_history.findMany({
        select: {
            ride_id: true,
            date_start: true,
            date_end: true,
            tickets_sold: true,
            capsules: {
                select: {
                    capsule_id: true,
                    model: true
                }
            },
            tubes: {
                select: {
                    stations_tubes_starting_station_idTostations: {
                        select: {
                            station_id: true,
                        }
                    },
                    stations_tubes_ending_station_idTostations: {
                        select: {
                            station_id: true,
                        }
                    }
                }
            },
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}
