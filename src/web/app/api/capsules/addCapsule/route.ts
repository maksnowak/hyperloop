import prisma from "@/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const model: string = searchParams.get("model")!;
    const producer: string = searchParams.get("producer")!;
    const type: string = searchParams.get("type")!;
    const depot: number = +searchParams.get("depot")!;
    if (!model || !producer || !type || !depot) {
        return NextResponse.json({ message: "Missing model, producer, type or depot", status: 400 });
    }

    try {
        await prisma.$queryRaw`CALL add_capsule(${model}, ${producer}, ${type}, CAST(${depot} AS INTEGER))`;
        return NextResponse.json({ message: "Capsule added successfully", status: 200 });
    } catch (e: any) {
        const errorMessage = e.message.split('ERROR:').at(-1).trim().replace(/`/g, '');
        console.log(e.message);
        return NextResponse.json({ message: errorMessage, status: 500 });
    }
}

export const dynamic = 'force-dynamic';
