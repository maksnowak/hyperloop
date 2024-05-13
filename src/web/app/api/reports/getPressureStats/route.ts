import { NextResponse } from "next/server";
import prisma from "@/app/client";

type ReposnseData = {
    data: Object[];
}

export async function GET() {
    return await prisma.tubes_data.findMany({
        where: {
            pressure: {
                not: null
            }
        },
        select: {
            data_id: true,
            time_of_measurement: true,
            pressure: true
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}
