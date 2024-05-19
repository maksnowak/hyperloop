import React from "react";

const getTableContent = (data: any) => {
    const s = 8; // temporary station ID
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        let event;
        let event_date;
        if (data[i].tubes.stations_tubes_starting_station_idTostations.station_id == s) {
            event = "Departure";
            event_date = data[i].date_start;
        }
        else if (data[i].tubes.stations_tubes_ending_station_idTostations.station_id == s) {
            event = "Arrival";
            event_date = data[i].date_end;
        }
        else {
            event = "Unknown";
        }
        event_date = new Date(event_date);
        rows.push(
            <tr key={data[i].ride_id}>
                <td>{event_date.toLocaleString("pl-PL")}</td>
                <td>{data[i].capsules.model} (ID: {data[i].capsules.capsule_id})</td>
                <td>{data[i].tickets_sold}</td>
                <td>{event}</td>
            </tr>
        );
    }
    return rows;
}

const StationTraffic = async ({
    id,
    from,
    to
}: {
    id: string;
    from: string;
    to: string;
}) => {
    const traffic = await (await fetch(`http://localhost:3000/api/reports/getStationTraffic?id=${id}&from=${from}&to=${to}`)).json();
    const tableContent = getTableContent(traffic.data);
    if (tableContent.length === 0) {
        return (
            <div>
                <h3>Traffic data</h3>
                <p>No traffic data found for this station in the selected time period</p>
            </div>
        )
    }
    return (
        <div>
            <h3>Traffic data</h3>
            <table>
                <thead>
                    <tr key="head">
                        <th>Date</th>
                        <th>Capsule</th>
                        <th>Number of passengers</th>
                        <th>Arrival/Departure</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </div>
    )
};

export default StationTraffic;

export const dynamic = 'force-dynamic';