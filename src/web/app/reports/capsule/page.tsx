"use client";
import React from "react";
// import "../globals.css";
import ReportTopBar from "@/components/reportTopBar";
import CapsuleRoutes from "@/components/capsuleRoutes";
import CapsuleRepairs from "@/components/capsuleRepairs";

const GenerateCapsuleReport = async () => {
    return (
        <>
            <ReportTopBar type="capsule" target="0" />
            <CapsuleRoutes />
            <CapsuleRepairs />
        </>
    );
};

export default GenerateCapsuleReport;