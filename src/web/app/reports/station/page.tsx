"use client";
import React from "react";
// import "../globals.css";
import ReportTopBar from "@/components/reportTopBar";
import StationPassengers from "@/components/stationPassengers";
import StationTraffic from "@/components/stationTraffic";

const GenerateStationReport = async () => {
    return (
        <>
            <ReportTopBar type="station" target="Station name" />
            <StationPassengers />
            <StationTraffic />
        </>
    );
};

export default GenerateStationReport;