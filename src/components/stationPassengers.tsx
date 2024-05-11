"use client";
import React from "react";

const getTableContent = (data: any) => {
    // ta funkcja będzie się łączyć z prismą żeby pobrać wszystkie elementy danego typu, na razie jest mock 
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(
            <tr key={i}>
                <td>{data[i].date}</td>
                <td>{data[i].passengers}</td>
            </tr>
        );
    }
    return rows;
}

const StationPassengers = () => {
    var mock = [
        {
            date: "2021-05-01",
            passengers: 100
        },
        {
            date: "2021-05-02",
            passengers: 120
        },
        {
            date: "2021-05-03",
            passengers: 130
        }
    ];
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
                    {getTableContent(mock)}
                </tbody>
            </table>
        </div>
    )
};

export default StationPassengers;