"use client";
import React from "react";

type ReportTopBarProps = {
    type: string;
    target: string;
}

const ReportTopBar = ({type, target}: ReportTopBarProps) => {
    var date = new Date();
    return (
        <div>
            <h1>Hyperloop</h1>
            <h2>Report for {type}: {target}</h2>
            <h5>Generated: {date.toLocaleString("pl-PL")}</h5>
        </div>
    )
};

export default ReportTopBar;