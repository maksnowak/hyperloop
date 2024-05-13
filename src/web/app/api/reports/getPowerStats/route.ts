import { NextResponse } from "next/server";
import prisma from "@/client";

type ReposnseData = {
    data: Object[];
}

export async function GET() {
    return await prisma.tubes_data.findMany({
        where: {
            generated_power: {
                not: null
            }
        },
        select: {
            data_id: true,
            time_of_measurement: true,
            generated_power: true
        }
    }).then((data) => {
        return NextResponse.json({ data });
    }).catch((error) => {
        return NextResponse.error();
    });
}
