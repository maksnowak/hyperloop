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
            }
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}
