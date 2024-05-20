"use client";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DateRangePicker, Button, Select, SelectSection, SelectItem } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

const ReportForm = () => {
    const [reportType, setReportType] = React.useState("Select report type");
    const [reportTarget, setReportTarget] = React.useState("");
    const [targets, setTargets] = React.useState(["Select report type first"])
    const [targetIDs, setTargetIDs] = React.useState([0] as number[]);
    const [reportFrom, setReportFrom] = React.useState(new Date().toISOString().substring(0, 10));
    const [reportTo, setReportTo] = React.useState(new Date().toISOString().substring(0, 10));
    const [reportRange, setReportRange] = React.useState({
        start: parseDate(new Date().toISOString().substring(0, 10)),
        end: parseDate(new Date().toISOString().substring(0, 10))
    });

    const router = useRouter();

    React.useEffect(() => {
        if (reportType === "Station") {
            fetch(`/api/stations/getStations`).then((response) => response.json()).then((data) => {
                let stationNames = data.data.map((station: any) => station.name);
                let stationIDs = data.data.map((station: any) => station.station_id);
                setTargets(stationNames);
                setTargetIDs(stationIDs);
            });
        } else if (reportType === "Tube") {
            fetch(`/api/tubes/getTubes`).then((response) => response.json()).then((data) => {
                let tubeNames = data.data.map((tube: any) => tube.name);
                let tubeIDs = data.data.map((tube: any) => tube.tube_id);
                setTargets(tubeNames);
                setTargetIDs(tubeIDs);
            });
        } else if (reportType === "Capsule") {
            fetch(`/api/capsules/getAllCapsules`).then((response) => response.json()).then((data) => {
                let capsuleNames = data.data.map((capsule: any) => capsule.producer+" "+capsule.model+" (ID: "+capsule.capsule_id+")");
                let capsuleIDs = data.data.map((capsule: any) => capsule.capsule_id);
                setTargets(capsuleNames);
                setTargetIDs(capsuleIDs);
            });
        }
        console.log(targetIDs);
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

    useEffect(() => {
        console.log(reportTarget);
        console.log(targets);
    }, [reportTarget]);

    return (
        <div>
            <form onSubmit={submitReport}>
                <Select label="Report type" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <SelectSection>
                        <SelectItem key="station" value="Station">Station</SelectItem>
                        <SelectItem key="tube" value="Tube">Tube</SelectItem>
                        <SelectItem key="capsule" value="Capsule">Capsule</SelectItem>
                    </SelectSection>
                </Select>
                <Select label="Report target" value={reportTarget} onChange={(e) => setReportTarget(e.target.value)}>
                    <SelectSection>
                        {targets.map((target) => <SelectItem key={target} value={target}>{target}</SelectItem>)}
                    </SelectSection>
                </Select>
                <DateRangePicker label="Report range" value={reportRange} onChange={(e) => {
                    setReportRange({
                        start: e.start,
                        end: e.end
                    });
                    setReportFrom(e.start.toString());
                    setReportTo(e.end.toString());
                    }
                }/>
                <Button type="submit">Generate report</Button>
            </form>
        </div>
    )
};

export default ReportForm;

export const dynamic = 'force-dynamic';