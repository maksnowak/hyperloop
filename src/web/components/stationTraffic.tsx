"use client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";
import BarChartComponent from "./barChart";

const getTableContent = (data: any, s: number): [React.JSX.Element[], string[], number[]] => {
    var rows = [];
    var others = new Map<string, number>();
    for (let i = 0; i < data.length; i++) {
        let event, event_date, stationName: string;
        if (data[i].tubes.stations_tubes_starting_station_idTostations.station_id == s) {
            event = "Departure";
            event_date = data[i].date_start;
            stationName = data[i].tubes.stations_tubes_ending_station_idTostations.name;
        }
        else if (data[i].tubes.stations_tubes_ending_station_idTostations.station_id == s) {
            event = "Arrival";
            event_date = data[i].date_end;
            stationName = data[i].tubes.stations_tubes_starting_station_idTostations.name;
        }
        else {
            event = "Unknown";
            stationName = "";
        }
        others.set(stationName, others.get(stationName) !== undefined ? others.get(stationName)! + 1 : 1)
        event_date = new Date(event_date);
        rows.push(
            <TableRow key={data[i].ride_id}>
                <TableCell>{event_date.toLocaleString("pl-PL", { timeZone: "UTC" })}</TableCell>
                <TableCell>{data[i].capsules.model} (ID: {data[i].capsules.capsule_id})</TableCell>
                <TableCell>{data[i].tickets_sold}</TableCell>
                <TableCell>{event}</TableCell>
            </TableRow>
        );
    }
    return [rows, Array.from(others.keys()), Array.from(others.values())];
}

const StationTraffic = ({
    id,
    from,
    to
}: {
    id: string;
    from: string;
    to: string;
}) => {
    const [labels, setLabels] = React.useState<string[]>([]);
    const [stationTraffic, setStationTraffic] = React.useState<number[]>([]);
    const [traffic, setTraffic] = React.useState({ data: [] });
    const [tableContent, setTableContent] = React.useState<any>([]);
    React.useEffect(() => {
        fetch(`/api/reports/getStationTraffic?id=${id}&from=${from}&to=${to}`).then((response) => response.json()).then((data) => {
            setTraffic(data);
        });
    }, []);
    React.useEffect(() => {
        const [rows, l, st] = getTableContent(traffic.data, Number(id));
        setTableContent(rows);
        setLabels(l);
        setStationTraffic(st);
    }, [traffic]);
    return (
        <div>
            <h3>Traffic from connected stations</h3>
            <BarChartComponent dataset={stationTraffic} labels={labels} />
            <h3>Traffic data</h3>
            <Table>
                <TableHeader>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Capsule</TableColumn>
                    <TableColumn>Number of passengers</TableColumn>
                    <TableColumn>Arrival/Departure</TableColumn>
                </TableHeader>
                <TableBody>
                    {tableContent}
                </TableBody>
            </Table>
        </div>
    )
};

export default StationTraffic;

export const dynamic = 'force-dynamic';
