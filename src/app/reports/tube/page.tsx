import React from "react";
// import "../globals.css";
import ReportTopBar from "@/components/reportTopBar";
import TubeTrips from "@/components/tubeTrips";

const GenerateTubeReport = () => {
    return (
        <>
            <ReportTopBar type="tube" target="A-B" />
            <TubeTrips />
        </>
    );
};

export default GenerateTubeReport;