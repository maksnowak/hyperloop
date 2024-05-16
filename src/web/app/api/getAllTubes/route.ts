import { NextResponse } from 'next/server'
import prisma from '@/client'

type ReposnseData = {
    data: Object[]
}

export async function GET() {
    return await prisma.tubes.findMany({
        select: {
            tube_id: true,
            name: true
        },
        orderBy: {
            name: 'asc'
        }
    }).then((data) => {
        return NextResponse.json({ data })
    }).catch((error) => {
        return NextResponse.error()
    })
}

export const dynamic = 'force-dynamic';