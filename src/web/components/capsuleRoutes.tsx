"use client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";

const getTableContent = (data: any) => {
    let rows = [];
    let totalDistance = 0;
    for (let i = 0; i < data.length; i++) {
        const start_date = new Date(data[i].date_start);
        const end_date = new Date(data[i].date_end);
        const duration = end_date.valueOf() - start_date.valueOf();
        totalDistance += Number(data[i].tubes.length);
        // conversion to human readable format
        let seconds = Math.floor(duration / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds %= 60;
        minutes %= 60;
        // end of conversion
        rows.push(
            <TableRow key={data[i].ride_id}>
                <TableCell>{start_date.toLocaleString("pl-PL", { timeZone: "UTC" })}</TableCell>
                <TableCell>{end_date.toLocaleString("pl-PL", { timeZone: "UTC" })}</TableCell>
                <TableCell>{data[i].tubes.stations_tubes_starting_station_idTostations.name}</TableCell>
                <TableCell>{data[i].tubes.stations_tubes_ending_station_idTostations.name}</TableCell>
                <TableCell>{hours !== 0 ? hours + "h " : ""}{minutes}m {seconds}s</TableCell>
            </TableRow>
        );
    }
    return [rows, totalDistance];
}

const CapsuleRoutes = ({
    id,
    from,
    to
}: {
    id: string;
    from: string;
    to: string;
}) => {
    const [totalDistance, setTotalDistance] = React.useState(0);
    const [routes, setRoutes] = React.useState({ data: [] });
    const [tableContent, setTableContent] = React.useState<any>([]);
    React.useEffect(() => {
        fetch(`/api/reports/getCapsuleRoutes?id=${id}&from=${from}&to=${to}`).then((response) => response.json()).then((data) => {
            setRoutes(data);
        });
    }, []);
    React.useEffect(() => {
        const [rows, dist] = getTableContent(routes.data);
        setTableContent(rows);
        setTotalDistance(Number(dist));
    }, [routes]);
    return (
        <div>
            <h3>Distance covered: {totalDistance}km</h3>
            <h3>Route history</h3>
            <Table>
                <TableHeader>
                    <TableColumn>Departure time</TableColumn>
                    <TableColumn>Arrival time</TableColumn>
                    <TableColumn>Start</TableColumn>
                    <TableColumn>Destination</TableColumn>
                    <TableColumn>Duration</TableColumn>
                </TableHeader>
                <TableBody>
                    {tableContent}
                </TableBody>
            </Table>
        </div>
    )
};

export default CapsuleRoutes;

export const dynamic = 'force-dynamic';
