import React from "react";

const getTableContent = (data: any) => {
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(
            <tr key={data[i].ride_id}>
                <td>{data[i].date_start}</td>
                <td>{data[i].date_end}</td>
                <td>{data[i].capsules.model} (ID: {data[i].capsules.capsule_id})</td>
                <td>{data[i].date_end - data[i].date_start}</td>
            </tr>
        ); //FIXME: duration returns NaN
    }
    return rows;
}

const TubeTrips = async () => {
    const trips = await (await fetch("http://localhost:3000/api/reports/getTubeTrips")).json();
    return (
        <div>
            <h3>Trips history</h3>
            <table>
                <thead>
                    <tr key="head">
                        <th>Entered at</th>
                        <th>Left at</th>
                        <th>Capsule</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {getTableContent(trips.data)}
                </tbody>
            </table>
        </div>
    )
};

export default TubeTrips;