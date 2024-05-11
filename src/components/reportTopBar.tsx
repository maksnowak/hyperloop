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
            <h5 suppressHydrationWarning>Generated: {date.toLocaleString("pl-PL")}</h5>
        </div>
    ); // bez suppressHydrationWarning strona wyrzuca error że data różni się między serwerem a klientem
};

export default ReportTopBar;