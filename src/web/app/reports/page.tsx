import React from "react";
import "@/app/globals.css";
import ReportForm from "@/components/reportForm"
import Sidebar from "@/components/sidebar";

const Reports = () => {
    return (
        <>
            <Sidebar />
            <ReportForm />
        </>
    );
};

export default Reports;


export const dynamic = 'force-dynamic';