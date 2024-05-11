import React from "react";
// import "../globals.css";
import ReportTopBar from "@/components/reportTopBar";
import TubeTrips from "@/components/tubeTrips";
import ChartComponent from "@/components/chart";

// tu będzie połączenie z prismą, na razie mock
const chartData = [
    {time: "00:00", power: 50},
    {time: "01:00", power: 60},
    {time: "02:00", power: 70},
    {time: "03:00", power: 80},
    {time: "04:00", power: 90},
    {time: "05:00", power: 100},
    {time: "06:00", power: 110},
    {time: "07:00", power: 120},
    {time: "08:00", power: 130},
    {time: "09:00", power: 140},
    {time: "10:00", power: 150},
    {time: "11:00", power: 160},
    {time: "12:00", power: 170},
    {time: "13:00", power: 180},
    {time: "14:00", power: 190},
    {time: "15:00", power: 200}
]

const GenerateTubeReport = () => {
    const data = {
        labels: chartData.map(item => item.time),
        datasets: [{
            label: 'Power',
            data: chartData.map(item => item.power),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
        }]
    };

    return (
        <>
            <ReportTopBar type="tube" target="A-B" />
            <TubeTrips />
            <h3>Generated power</h3>
            <ChartComponent type={'line'} data={data} />
            <h3>Tube pressure</h3>
            <ChartComponent type={'line'} data={data} />
        </>
    );
};

export default GenerateTubeReport;