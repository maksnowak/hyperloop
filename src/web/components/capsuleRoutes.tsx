"use client";
import React from "react";

const getTableContent = (data: any) => {
    // ta funkcja będzie się łączyć z prismą żeby pobrać wszystkie elementy danego typu, na razie jest mock 
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(
            <tr key={i}>
                <td>{data[i].departureTime}</td>
                <td>{data[i].arrivalTime}</td>
                <td>{data[i].start}</td>
                <td>{data[i].destination}</td>
                <td>{data[i].duration}</td>
            </tr>
        );
    }
    return rows;
}

const CapsuleRoutes = () => {
    var mock = [
        {
            departureTime: "Warszawa",
            arrivalTime: "Kraków",
            start: "2021-05-01 12:00",
            destination: "2021-05-01 14:00",
            duration: "2h"
        },
        {
            departureTime: "Kraków",
            arrivalTime: "Warszawa",
            start: "2021-05-01 16:00",
            destination: "2021-05-01 18:00",
            duration: "2h"
        },
        {
            departureTime: "Warszawa",
            arrivalTime: "Gdańsk",
            start: "2021-05-01 20:00",
            destination: "2021-05-01 22:00",
            duration: "2h"
        }
    ];
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
                    {getTableContent(mock)}
                </tbody>
            </table>
        </div>
    )
};

export default CapsuleRoutes;