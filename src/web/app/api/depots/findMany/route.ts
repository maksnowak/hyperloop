import prisma from "../../../client";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    return await prisma.depots.findMany()
        .then((data) => {
            return NextResponse.json( {data} );
        }).catch((error) => {
            return NextResponse.error();
        });
}