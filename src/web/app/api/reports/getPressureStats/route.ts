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
    return await prisma.tubes_data.findMany({
        where: {
            pressure: {
                not: null
            },
            referred_tube_id: id
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
