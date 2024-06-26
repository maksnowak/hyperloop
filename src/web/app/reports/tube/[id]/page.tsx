"use client";
import React from "react";
import "@/app/globals.css";
import ReportTopBar from "@/components/reportTopBar";
import TubeTrips from "@/components/tubeTrips";
import LineChartComponent from "@/components/lineChart";

const getDaysApart = (to: string, from: string) => {
    const timeDiff = (new Date(to)).getTime() - (new Date(from)).getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
}

const GenerateTubeReport = ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string }
}) => {
    const [name, setName] = React.useState("");
    const [avgPassengers, setAvgPassengers] = React.useState("");
    const granularity = getDaysApart(searchParams.from, searchParams.to) * 4;

    React.useEffect(() => {
        fetch(`/api/tubes/getTube?id=${params.id}`).then((response) => response.json()).then((data) => {
            setName(data.data.name);
        });
    }, []);
    React.useEffect(() => {
        fetch(`/api/reports/getAveragePassengers?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`).then((response) => response.json()).then((data) => {
            console.log(data);
            setAvgPassengers(data.data.average_passenger_count);
        });
    }, []);
    return (
        <>
            <div className="max-w-2xl mx-auto">
                <ReportTopBar type="tube" target={name} />
                <h4>Average daily number of passengers: {Number(avgPassengers).toFixed(2)}</h4>
                <h3>Generated power</h3>
                <LineChartComponent url={`/api/reports/getPowerStats?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels_key="time_of_measurement" data_key="generated_power" label_name="Power" granularity={granularity} />
                <h3>Tube pressure</h3>
                <LineChartComponent url={`/api/reports/getPressureStats?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels_key="time_of_measurement" data_key="pressure" label_name="Pressure" granularity={granularity} />
                <TubeTrips id={params.id} from={searchParams.from} to={searchParams.to} />
            </div>
        </>
    );
};

export default GenerateTubeReport;


export const dynamic = 'force-dynamic';
