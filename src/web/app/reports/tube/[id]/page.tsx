import React from "react";
// import "../globals.css";
import ReportTopBar from "@/components/reportTopBar";
import TubeTrips from "@/components/tubeTrips";
import LineChartComponent from "@/components/lineChart";
import prisma from "@/client";

const GenerateTubeReport = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string }
}) => {
    const name = await prisma.tubes.findUnique({
        where: {
            tube_id: Number(params.id)
        },
        select: {
            name: true
        }
    });
    const avgPassengers = await (await fetch(`http://localhost:3000/api/reports/getAveragePassengers?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`)).json();
    return (
        <>
            <ReportTopBar type="tube" target={name!.name} />
            <h4>Average daily number of passengers: {avgPassengers.data.average_passenger_count || "0"}</h4>
            <TubeTrips id={params.id} from={searchParams.from} to={searchParams.to}/>
            <h3>Generated power</h3>
            <LineChartComponent url={`http://localhost:3000/api/reports/getPowerStats?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels_key="time_of_measurement" data_key="generated_power" label_name="Power"/>
            <h3>Tube pressure</h3>
            <LineChartComponent url={`http://localhost:3000/api/reports/getPressureStats?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels_key="time_of_measurement" data_key="pressure" label_name="Pressure"/>
        </>
    ); // FIXME: for some reason average_passenger_count is not being displayed
};

export default GenerateTubeReport;


export const dynamic = 'force-dynamic';