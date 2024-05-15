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
    return await prisma.station_logs.findMany({
        where: {
            referred_station_id: id,
            AND: [
                {
                    date: {
                        gte: from
                    }
                },
                {
                    date: {
                        lte: to
                    }
                }
            ]
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
