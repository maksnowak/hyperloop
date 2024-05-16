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
        from = params.from
        to = params.to
    } catch (error) {
        return NextResponse.error();
    }
    const tube_ends = await prisma.tubes.findUnique({
        where: {
            tube_id: id
        },
        select: {
            starting_station_id: true,
            ending_station_id: true
        }
    });
    console.log(tube_ends, from, to);
    return await prisma.$queryRaw`SELECT average_passenger_count(${tube_ends!.starting_station_id}::int, ${tube_ends!.ending_station_id}::int, ${from}::timestamp, ${to}::timestamp, 'false'::bool);`.then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}