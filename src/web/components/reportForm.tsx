"use client";
import React from "react";

const ReportForm = () => {
    const [reportType, setReportType] = React.useState("Select report type");
    const [reportTarget, setReportTarget] = React.useState("");
    const [targets, setTargets] = React.useState(["Select report type first"]) // this should be fetched from the API, for now it's hardcoded
    const [reportFrom, setReportFrom] = React.useState("");
    const [reportTo, setReportTo] = React.useState("");

    React.useEffect(() => {
        if (reportType === "Station") {
            fetch("http://localhost:3000/api/getAllStations").then((response) => response.json()).then((data) => {
                let stationNames = data.data.map((station: any) => station.name);
                setTargets(stationNames);
            });
        } else if (reportType === "Tube") {
            fetch("http://localhost:3000/api/getAllTubes").then((response) => response.json()).then((data) => {
                let tubeNames = data.data.map((tube: any) => tube.name);
                setTargets(tubeNames);
            });
        } else if (reportType === "Capsule") {
            fetch("http://localhost:3000/api/getAllCapsules").then((response) => response.json()).then((data) => {
                let capsuleNames = data.data.map((capsule: any) => capsule.model);
                setTargets(capsuleNames);
            });
        }
    }, [reportType]);

    return (
        <div>
            <h3>Report form</h3>
            <form>
                <label>
                    Report type:
                    <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                        <option value="Select report type" selected disabled hidden>Select report type</option>
                        <option value="Station">Station</option>
                        <option value="Tube">Tube</option>
                        <option value="Capsule">Capsule</option>
                    </select>
                </label>
                <br />
                <label>
                    Target:
                    <select value={reportTarget} onChange={(e) => setReportTarget(e.target.value)}>
                        {targets.map((target) => <option key={target} value={target}>{target}</option>)}
                    </select>
                </label>
                <br />
                <label>
                    From:
                    <input type="date" value={reportFrom} onChange={(e) => setReportFrom(e.target.value)} />
                </label>
                <br />
                <label>
                    To:
                    <input type="date" value={reportTo} onChange={(e) => setReportTo(e.target.value)} />
                </label>
                <br />
                <input type="submit" value="Generate report" />
            </form>
        </div>
    )
};

export default ReportForm;