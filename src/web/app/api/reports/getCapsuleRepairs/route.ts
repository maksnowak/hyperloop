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
    return await prisma.repairs_history.findMany({
        where: {
            referred_capsule_id: id 
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
