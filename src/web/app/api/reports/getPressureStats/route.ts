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
    return await prisma.tubes_data.findMany({
        where: {
            pressure: {
                not: null
            },
            referred_tube_id: id,
            AND: [
                {
                    time_of_measurement: {
                        gte: from
                    }
                },
                {
                    time_of_measurement: {
                        lte: to
                    }
                }
            ]
        },
        select: {
            data_id: true,
            time_of_measurement: true,
            pressure: true
        },
        orderBy: {
            time_of_measurement: 'asc'
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}

export const dynamic = 'force-dynamic';