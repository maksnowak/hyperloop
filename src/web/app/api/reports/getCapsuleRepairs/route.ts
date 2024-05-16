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
    return await prisma.repairs_history.findMany({
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
            repair_id: true,
            date_start: true,
            date_end: true,
            performing_depot_id: true
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