"use client";
import React from "react";

const getReportTargets = (reportType: string) => {
    // ta funkcja będzie się łączyć z prismą żeby pobrać wszystkie elementy danego typu, na razie jest mock 
    if (reportType === "Stacja") {
        return "Nazwa stacji";
    } else if (reportType === "Odcinek") {
        return "Odcinek A-B";
    } else if (reportType === "Kapsuła") {
        return "Numer kapsuły i jej nazwa";
    }
}

const ReportForm = () => {
    const [reportType, setReportType] = React.useState("Stacja");
    const [reportTarget, setReportTarget] = React.useState(getReportTargets(reportType));

    return (
        <div>
            <form>
                <label>Select report type</label>
                <br />
                <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <option value="Stacja">Stacja</option>
                    <option value="Odcinek">Odcinek</option>
                    <option value="Kapsuła">Kapsuła</option>
                </select>
                <br />
                <label>Select the object you want the report for</label>
                <br />
                <select value={reportTarget} onChange={(e) => setReportTarget(e.target.value)}>
                    <option value={getReportTargets(reportType)}>{getReportTargets(reportType)}</option>
                </select>
                <br />
                <label>Select beginning date</label>
                <br />
                <input type="date" />
                <br />
                <label>Select end date</label>
                <br />
                <input type="date" />
                <br />
                <button type="submit">Generate</button>
            </form>
        </div>
    )
};

export default ReportForm;