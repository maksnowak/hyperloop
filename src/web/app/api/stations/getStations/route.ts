import prisma from "@/client";
import { NextResponse } from "next/server";

type ResponseData = {
    data: Object[];
}

export async function GET(request: Request) {
    return await prisma.stations.findMany()
        .then((data) => {
            return NextResponse.json({ data });
        }).catch((error) => {
            return NextResponse.error();
        });
}

export const dynamic = 'force-dynamic';
