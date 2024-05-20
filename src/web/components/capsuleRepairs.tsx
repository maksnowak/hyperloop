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

const CapsuleRepairs = async ({
    id,
    from,
    to
}: {
    id: string;
    from: string;
    to: string;
}) => {
    const repairs = await (await fetch(`http://localhost:3000/api/reports/getCapsuleRepairs?id=${id}&from=${from}&to=${to}`)).json();
    const tableContent = getTableContent(repairs.data);
    if (tableContent.length === 0) {
        return (
            <div>
                <h3>Repair history</h3>
                <p>No repairs found for this capsule in the selected time period</p>
            </div>
        )
    }
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