"use client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";

const getTableContent = (data: any) => {
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        const start_date = new Date(data[i].date_start);
        const end_date = new Date(data[i].date_end);
        const duration = end_date.valueOf() - start_date.valueOf();
        // conversion to human readable format
        let seconds = Math.floor(duration / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds %= 60;
        minutes %= 60;
        // end of conversion
        rows.push(
            <TableRow key={data[i].ride_id}>
                <TableCell>{start_date.toLocaleString("pl-PL", {timeZone: "UTC"})}</TableCell>
                <TableCell>{end_date.toLocaleString("pl-PL", {timeZone: "UTC"})}</TableCell>
                <TableCell>{data[i].capsules.model} (ID: {data[i].capsules.capsule_id})</TableCell>
                <TableCell>{hours !== 0 ? hours+"h " : ""}{minutes}m {seconds}s</TableCell>
            </TableRow>
        );
    }
    return rows;
}

const TubeTrips = ({
    id,
    from,
    to
}: {
    id: string;
    from: string;
    to: string;
}) => {
    const [trips, setTrips] = React.useState({data: []});
    const [tableContent, setTableContent] = React.useState<any>([]);
    React.useEffect(() => {
        fetch(`/api/reports/getTubeTrips?id=${id}&from=${from}&to=${to}`).then((response) => response.json()).then((data) => {
            setTrips(data);
        });
    }, [id, from, to]);
    React.useEffect(() => {
        setTableContent(getTableContent(trips.data));
    }, [trips]);
    return (
        <div>
            <h3>Trips history</h3>
            <Table>
                <TableHeader>
                    <TableColumn>Entered at</TableColumn>
                    <TableColumn>Left at</TableColumn>
                    <TableColumn>Capsule</TableColumn>
                    <TableColumn>Duration</TableColumn>
                </TableHeader>
                <TableBody>
                    {tableContent}
                </TableBody>
            </Table>
        </div>
    )
};

export default TubeTrips;

export const dynamic = 'force-dynamic';