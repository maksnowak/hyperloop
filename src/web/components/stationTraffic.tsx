"use client";
import React from "react";

const getTableContent = (data: any) => {
    // ta funkcja będzie się łączyć z prismą żeby pobrać wszystkie elementy danego typu, na razie jest mock 
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(
            <tr key={i}>
                <td>{data[i].date}</td>
                <td>{data[i].capsule}</td>
                <td>{data[i].passengers}</td>
                <td>{data[i].event}</td>
            </tr>
        );
    }
    return rows;
}

const StationTraffic = () => {
    var mock = [
        {
            date: "2021-05-01",
            capsule: "1",
            passengers: 100,
            event: "Arrival"
        },
        {
            date: "2021-05-02",
            capsule: "2",
            passengers: 120,
            event: "Departure"
        },
        {
            date: "2021-05-03",
            capsule: "3",
            passengers: 130,
            event: "Arrival"
        }
    ];
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
                    {getTableContent(mock)}
                </tbody>
            </table>
        </div>
    )
};

export default StationTraffic;