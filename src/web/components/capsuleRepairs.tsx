import React from "react";

const getTableContent = (data: any) => {
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        const start_date = new Date(data[i].date_start);
        const end_date = new Date(data[i].date_end);
        rows.push(
            <tr key={data[i].repair_id}>
                <td>{start_date.toLocaleDateString("pl-PL", {timeZone: "UTC"})}</td>
                <td>{end_date?.toLocaleDateString("pl-PL", {timeZone: "UTC"})}</td>
                <td>{data[i].performing_depot_id}</td>
            </tr>
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
            <table>
                <thead>
                    <tr key="head">
                        <th>Repair start</th>
                        <th>Repair end</th>
                        <th>Depot</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </div>
    )
};

export default CapsuleRepairs;

export const dynamic = 'force-dynamic';