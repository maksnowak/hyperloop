"use client";
import React from "react";
import "@/app/globals.css";
import ReportTopBar from "@/components/reportTopBar";
import TubeTrips from "@/components/tubeTrips";
import LineChartComponent from "@/components/lineChart";
import prisma from "@/client";

const GenerateTubeReport = ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string }
}) => {
    const [name, setName] = React.useState({name: ""});
    const [avgPassengers, setAvgPassengers] = React.useState<any>({data: []});
    React.useEffect(() => {
        fetch(`/api/tubes/getTube?id=${params.id}`).then((response) => response.json()).then((data) => {
            setName(data);
        });
    }, [params.id]);
    React.useEffect(() => {
        fetch(`/api/reports/getAvgPassengers?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`).then((response) => response.json()).then((data) => {
            setAvgPassengers(data);
        });
    }, [params.id, searchParams.from, searchParams.to]);
    return (
        <>
            <div className="max-w-2xl mx-auto">
                <ReportTopBar type="tube" target={name!.name} />
                <h4>Average daily number of passengers: {avgPassengers.data[0].average_passenger_count || "0"}</h4>
                <TubeTrips id={params.id} from={searchParams.from} to={searchParams.to}/>
                <h3>Generated power</h3>
                <LineChartComponent url={`/api/reports/getPowerStats?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels_key="time_of_measurement" data_key="generated_power" label_name="Power"/>
                <h3>Tube pressure</h3>
                <LineChartComponent url={`/api/reports/getPressureStats?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels_key="time_of_measurement" data_key="pressure" label_name="Pressure"/>
            </div>
        </>
    );
};

export default GenerateTubeReport;


export const dynamic = 'force-dynamic';