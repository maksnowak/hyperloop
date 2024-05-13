"use client";
import React from "react";
// import "../globals.css";
import ReportTopBar from "@/components/reportTopBar";
import TubeTrips from "@/components/tubeTrips";
import ChartComponent from "@/components/chart";

const GenerateTubeReport = () => {
    //TODO: make charts from fetched data
    return (
        <>
            <ReportTopBar type="tube" target="A-B" />
            <TubeTrips />
            <h3>Generated power</h3>
            {/* <ChartComponent type={'line'} data={powerData} /> */}
            <h3>Tube pressure</h3>
            {/* <ChartComponent type={'line'} data={data} /> */}
        </>
    );
};

export default GenerateTubeReport;