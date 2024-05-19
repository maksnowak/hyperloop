// @ts-nocheck
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
    return await prisma.$queryRaw`SELECT passenger_flow(${id}::int, ${from}::timestamp, ${to}::timestamp)::varchar;`
    .then((data) => {
        const parsedData = data.map((item: any) => {
            const values = item.passenger_flow.slice(1, -1).split(',');
            return {
                trips_in: values[0],
                trips_out: values[1],
                passengers_in: values[2],
                passengers_out: values[3]
            };
        });
        return NextResponse.json({ data: parsedData });
    })
    .catch((error) => {
        return NextResponse.error();
    });
}

export const dynamic = 'force-dynamic';