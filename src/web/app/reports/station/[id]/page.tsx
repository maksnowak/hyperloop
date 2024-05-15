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
    searchParams: { [key: string]: string | string[] | undefined }
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
            <StationPassengers />
            <StationTraffic />
        </>
    );
};

export default GenerateStationReport;