import { NextRequest, NextResponse } from "next/server";
import prisma from "@/client";

type ReposnseData = {
    data: Object[];
}

export async function GET(req: NextRequest) {
    let id;
    try {
        id = Number(req.nextUrl.searchParams.get('id'));
    } catch (error) {
        return NextResponse.error();
    }
    return await prisma.capsules.findUnique({
        where: {
            capsule_id: Number(id)
        },
        select: {
            producer: true,
            model: true
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}

export const dynamic = 'force-dynamic';
