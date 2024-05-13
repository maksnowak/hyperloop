import React from "react";

const getTableContent = (data: any) => {
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(
            <tr key={data[i].ride_id}>
                <td>{data[i].date_start}</td>
                <td>{data[i].date_end}</td>
                <td>{data[i].tubes.stations_tubes_starting_station_idTostations.name}</td>
                <td>{data[i].tubes.stations_tubes_ending_station_idTostations.name}</td>
                <td>{data[i].date_end - data[i].date_start}</td> 
            </tr>
        ); //FIXME: duration returns NaN
    }
    return rows;
}

const CapsuleRoutes = async () => {
    const routes = await (await fetch("http://localhost:3000/api/reports/getCapsuleRoutes")).json();
    return (
        <div>
            <h3>Route history</h3>
            <table>
                <thead>
                    <tr key="head">
                        <th>Departure time</th>
                        <th>Arrival time</th>
                        <th>Start</th>
                        <th>Destination</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {getTableContent(routes.data)}
                </tbody>
            </table>
        </div>
    )
};

export default CapsuleRoutes;