"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ReportForm = () => {
    const [reportType, setReportType] = React.useState("Select report type");
    const [reportTarget, setReportTarget] = React.useState("");
    const [targets, setTargets] = React.useState(["Select report type first"])
    const [targetIDs, setTargetIDs] = React.useState([0] as number[]);
    const [reportFrom, setReportFrom] = React.useState("");
    const [reportTo, setReportTo] = React.useState("");

    const router = useRouter();

    React.useEffect(() => {
        if (reportType === "Station") {
            fetch("http://localhost:3000/api/getAllStations").then((response) => response.json()).then((data) => {
                let stationNames = data.data.map((station: any) => station.name);
                let stationIDs = data.data.map((station: any) => station.station_id);
                setTargets(stationNames);
                setTargetIDs(stationIDs);
                setReportTarget(stationNames[0]);
            });
        } else if (reportType === "Tube") {
            fetch("http://localhost:3000/api/getAllTubes").then((response) => response.json()).then((data) => {
                let tubeNames = data.data.map((tube: any) => tube.name);
                let tubeIDs = data.data.map((tube: any) => tube.tube_id);
                setTargets(tubeNames);
                setTargetIDs(tubeIDs);
                setReportTarget(tubeNames[0]);
            });
        } else if (reportType === "Capsule") {
            fetch("http://localhost:3000/api/getAllCapsules").then((response) => response.json()).then((data) => {
                let capsuleNames = data.data.map((capsule: any) => capsule.producer+" "+capsule.model+" (ID: "+capsule.capsule_id+")");
                let capsuleIDs = data.data.map((capsule: any) => capsule.capsule_id);
                setTargets(capsuleNames);
                setTargetIDs(capsuleIDs);
                setReportTarget(capsuleNames[0]);
            });
        }
    }, [reportType]);

    const submitReport = (event: React.FormEvent) => {
        event.preventDefault();

        if (reportType === "Select report type") {
            alert("Please select a report type");
            return;
        }
        let targetID = targetIDs[targets.indexOf(reportTarget)];
        router.push(`/reports/${reportType.toLowerCase()}/${targetID}?from=${reportFrom}&to=${reportTo}`);
    }

    return (
        <div>
            <h3>Report form</h3>
            <form onSubmit={submitReport}>
                <label>
                    Report type:
                    <select value={reportType} required onChange={(e) => setReportType(e.target.value)}>
                        <option value="Select report type" disabled hidden>Select report type</option>
                        <option value="Station">Station</option>
                        <option value="Tube">Tube</option>
                        <option value="Capsule">Capsule</option>
                    </select>
                </label>
                <br />
                <label>
                    Target:
                    <select value={reportTarget} required onChange={(e) => setReportTarget(e.target.value)}>
                        {targets.map((target) => <option key={target} value={target}>{target}</option>)}
                    </select>
                </label>
                <br />
                <label>
                    From:
                    <input type="date" value={reportFrom} required onChange={(e) => setReportFrom(e.target.value)} />
                </label>
                <br />
                <label>
                    To:
                    <input type="date" value={reportTo} required onChange={(e) => setReportTo(e.target.value)} />
                </label>
                <br />
                <input type="submit" value="Generate report"/>
            </form>
        </div>
    )
};

export default ReportForm;

export const dynamic = 'force-dynamic';