import React from "react";
// import "../globals.css";
import ReportTopBar from "@/components/reportTopBar";
import CapsuleRoutes from "@/components/capsuleRoutes";
import CapsuleRepairs from "@/components/capsuleRepairs";
import prisma from "@/client";

const GenerateCapsuleReport = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string }
}) => {
    const name = await prisma.capsules.findUnique({
        where: {
            capsule_id: Number(params.id)
        },
        select: {
            producer: true,
            model: true
        }
    });
    return (
        <>
            <ReportTopBar type="capsule" target={name!.producer+" "+name!.model+" (ID: "+params.id+")"}  />
            <CapsuleRoutes id={params.id} from={searchParams.from} to={searchParams.to}/>
            <CapsuleRepairs id={params.id} from={searchParams.from} to={searchParams.to}/>
        </>
    );
};

export default GenerateCapsuleReport;