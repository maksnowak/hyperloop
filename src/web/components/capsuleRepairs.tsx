"use client";
import React from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

const getTableContent = (data: any) => {
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        const start_date = new Date(data[i].date_start);
        const end_date = new Date(data[i].date_end);
        rows.push(
            <TableRow key={data[i].repair_id}>
                <TableCell>{start_date.toLocaleDateString("pl-PL", {timeZone: "UTC"})}</TableCell>
                <TableCell>{end_date?.toLocaleDateString("pl-PL", {timeZone: "UTC"})}</TableCell>
                <TableCell>{data[i].performing_depot_id}</TableCell>
            </TableRow>
        );
    }
    return rows;
}

const CapsuleRepairs = ({
    id,
    from,
    to
}: {
    id: string;
    from: string;
    to: string;
}) => {
    const [repairs, setRepairs] = React.useState({data: []});
    const [tableContent, setTableContent] = React.useState<any>([]);
    React.useEffect(() => {
        fetch(`/api/reports/getCapsuleRepairs?id=${id}&from=${from}&to=${to}`).then((response) => response.json()).then((data) => {
            setRepairs(data);
        });
    }, []);
    React.useEffect(() => {
        setTableContent(getTableContent(repairs.data));
    }, [repairs]);
    return (
        <div>
            <h3>Repair history</h3>
            <Table>
                <TableHeader>
                    <TableColumn>Repair start</TableColumn>
                    <TableColumn>Repair end</TableColumn>
                    <TableColumn>Depot</TableColumn>
                </TableHeader>
                <TableBody>
                    {tableContent}
                </TableBody>
            </Table>
        </div>
    )
};

export default CapsuleRepairs;

export const dynamic = 'force-dynamic';