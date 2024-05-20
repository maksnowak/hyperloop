"use client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";

const getTableContent = (data: any, s: number) => {
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        let event;
        let event_date;
        if (data[i].tubes.stations_tubes_starting_station_idTostations.station_id == s) {
            event = "Departure";
            event_date = data[i].date_start;
        }
        else if (data[i].tubes.stations_tubes_ending_station_idTostations.station_id == s) {
            event = "Arrival";
            event_date = data[i].date_end;
        }
        else {
            event = "Unknown";
        }
        event_date = new Date(event_date);
        rows.push(
            <TableRow key={data[i].ride_id}>
                <TableCell>{event_date.toLocaleString("pl-PL", {timeZone: "UTC"})}</TableCell>
                <TableCell>{data[i].capsules.model} (ID: {data[i].capsules.capsule_id})</TableCell>
                <TableCell>{data[i].tickets_sold}</TableCell>
                <TableCell>{event}</TableCell>
            </TableRow>
        );
    }
    return rows;
}

const StationTraffic = async ({
    id,
    from,
    to
}: {
    id: string;
    from: string;
    to: string;
}) => {
    const traffic = await (await fetch(`http://localhost:3000/api/reports/getStationTraffic?id=${id}&from=${from}&to=${to}`)).json();
    const tableContent = getTableContent(traffic.data, Number(id));
    if (tableContent.length === 0) {
        return (
            <div>
                <h3>Traffic data</h3>
                <p>No traffic data found for this station in the selected time period</p>
            </div>
        )
    }
    return (
        <div>
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