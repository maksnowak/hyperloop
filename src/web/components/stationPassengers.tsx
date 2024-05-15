import React from "react";

const getTableContent = (data: any) => {
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        const log_date = new Date(data[i].date);
        rows.push(
            <tr key={data[i].log_id}>
                <td>{log_date.toLocaleDateString("pl-PL")}</td>
                <td>{data[i].passengers_served}</td>
            </tr>
        );
    }
    return rows;
}

const StationPassengers = async () => {
    const passengers = await (await fetch("http://localhost:3000/api/reports/getStationPassengers")).json();
    return (
        <div>
            <h3>Passengers</h3>
            <table>
                <thead>
                    <tr key="head">
                        <th>Date</th>
                        <th>Number of passengers</th>
                    </tr>
                </thead>
                <tbody>
                    {getTableContent(passengers.data)}
                </tbody>
            </table>
        </div>
    )
};

export default StationPassengers;