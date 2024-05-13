import React from "react";

const getTableContent = (data: any) => {
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(
            <tr key={data[i].repair_id}>
                <td>{data[i].date_start.toLocaleString()}</td>
                <td>{data[i].date_end?.toLocaleString()}</td>
                <td>{data[i].performing_depot_id}</td>
            </tr>
        );
    }
    return rows;
}

const CapsuleRepairs = async () => {
    const repairs = await (await fetch("http://localhost:3000/api/reports/getCapsuleRepairs")).json();
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
                    {getTableContent(repairs.data)}
                </tbody>
            </table>
        </div>
    )
};

export default CapsuleRepairs;