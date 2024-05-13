import { NextResponse } from "next/server";
import prisma from "@/app/client";

type ReposnseData = {
    data: Object[];
}

export async function GET() {
    return await prisma.repairs_history.findMany({
        select: {
            repair_id: true,
            date_start: true,
            date_end: true,
            performing_depot_id: true
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}
