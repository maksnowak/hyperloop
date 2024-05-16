import prisma from "../../../client";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const capsule_id: number = +searchParams.get("capsule_id")!;
    const status: string = searchParams.get("status")!;
    if (!capsule_id || !status) {
        return NextResponse.json({message: "Missing capsule_id or status", status: 400 });
    }
    if (status === "Under repair") {
        try {
            await prisma.$queryRaw`CALL finish_repair(CAST(${capsule_id} AS INTEGER))`;
            return NextResponse.json({message: "Repair ended successfully", status: 200 });
        } catch (e: any) {
            const errorMessage = e.message.split(':').at(-1).trim();
            console.log(e.message);
            return NextResponse.json({message: errorMessage, status: 500 });
        }
    }
    try {
        await prisma.$queryRaw`CALL start_repair(CAST(${capsule_id} AS INTEGER))`;
        return NextResponse.json({message: "Repair started successfully", status: 200 });
    } catch (e: any) {
        const errorMessage = e.message.split('ERROR:').at(-1).trim().replace(/`/g, '');
        console.log(e.message);
        return NextResponse.json({message: errorMessage, status: 500 });
    }
}