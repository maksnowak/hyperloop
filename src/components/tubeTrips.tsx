"use client";
import React from "react";

const getTableContent = (data: any) => {
    // ta funkcja będzie się łączyć z prismą żeby pobrać wszystkie elementy danego typu, na razie jest mock 
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(
            <tr key={i}>
                <td>{data[i].entered}</td>
                <td>{data[i].left}</td>
                <td>{data[i].capsule}</td>
                <td>{data[i].travelTime}</td>
            </tr>
        );
    }
    return rows;
}

const TubeTrips = () => {
    var mock = [
        {
            entered: "2021-05-01 12:00",
            left: "2021-05-01 14:00",
            capsule: "1",
            travelTime: "2h"
        },
        {
            entered: "2021-05-01 16:00",
            left: "2021-05-01 18:00",
            capsule: "2",
            travelTime: "2h"
        },
        {
            entered: "2021-05-01 20:00",
            left: "2021-05-01 22:00",
            capsule: "3",
            travelTime: "2h"
        }
    ];
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
                    {getTableContent(mock)}
                </tbody>
            </table>
        </div>
    )
};

export default TubeTrips;