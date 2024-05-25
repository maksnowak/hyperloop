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

const TubeTrips = async ({
    id,
    from,
    to
}: {
    id: string;
    from: string;
    to: string;
}) => {
    const [trips, setTrips] = React.useState({data: []});
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        fetch(`/api/getTubeTrips?id=${id}&from=${from}&to=${to}`).then((response) => response.json()).then((data) => {
            setTrips(data);
        });
        if (trips.data.length > 0) {
            setLoading(false);
        }
    }, [id, from, to]);
    const tableContent = getTableContent(trips.data);
    if (tableContent.length === 0) {
        return (
            <div>
                <h3>Trips history</h3>
                <p>No trips found for this capsule in the selected time period</p>
            </div>
        )
    }
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