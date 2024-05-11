"use client";
import React from "react";

const getTableContent = (data: any) => {
    // ta funkcja będzie się łączyć z prismą żeby pobrać wszystkie elementy danego typu, na razie jest mock 
    var rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(
            <tr key={i}>
                <td>{data[i].repairStart}</td>
                <td>{data[i].repairEnd}</td>
                <td>{data[i].depot}</td>
            </tr>
        );
    }
    return rows;
}

const CapsuleRepairs = () => {
    var mock = [
        {
            repairStart: "2021-05-01 12:00",
            repairEnd: "2021-05-01 14:00",
            depot: "Warszawa"
        },
        {
            repairStart: "2021-05-01 16:00",
            repairEnd: "2021-05-01 18:00",
            depot: "Kraków"
        },
        {
            repairStart: "2021-05-01 20:00",
            repairEnd: "2021-05-01 22:00",
            depot: "Gdańsk"
        }
    ];
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
                    {getTableContent(mock)}
                </tbody>
            </table>
        </div>
    )
};

export default CapsuleRepairs;