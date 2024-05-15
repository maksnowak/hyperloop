import { NextResponse } from "next/server";
import prisma from "@/client";

type ReposnseData = {
    data: Object[];
}

export async function GET() {
    return await prisma.capsules.findMany({
        select: {
            capsule_id: true,
            model: true,
            producer: true,
        },
        orderBy: [
            {
                producer: 'asc'
            },
            {
                model: 'asc'
            },
            {
                capsule_id: 'asc'
            }
        ]
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}