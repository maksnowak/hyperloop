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
            <tr key={data[i].ride_id}>
                <td>{start_date.toLocaleString("pl-PL")}</td>
                <td>{end_date.toLocaleString("pl-PL")}</td>
                <td>{data[i].capsules.model} (ID: {data[i].capsules.capsule_id})</td>
                <td>{hours !== 0 ? hours+"h " : ""}{minutes}m {seconds}s</td>
            </tr>
        );
    }
    return rows;
}

const TubeTrips = async () => {
    const trips = await (await fetch("http://localhost:3000/api/reports/getTubeTrips?id=1&from=2022-01-01&to=2025-01-01")).json(); // for now params are hardcoded
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