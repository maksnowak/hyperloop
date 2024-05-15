import React from "react";
// import "../globals.css";
import ReportTopBar from "@/components/reportTopBar";
import StationPassengers from "@/components/stationPassengers";
import StationTraffic from "@/components/stationTraffic";
import prisma from "@/client";

const GenerateStationReport = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string }
}) => {
    const name = await prisma.stations.findUnique({
        where: {
            station_id: Number(params.id)
        },
        select: {
            name: true
        }
    });
    return (
        <>
            <ReportTopBar type="station" target={name!.name} />
            <StationPassengers id={params.id} from={searchParams.from} to={searchParams.to}/>
            <StationTraffic id={params.id} from={searchParams.from} to={searchParams.to}/>
        </>
    );
};

export default GenerateStationReport;