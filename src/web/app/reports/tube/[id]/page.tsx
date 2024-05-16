import React from "react";
import "@/app/globals.css";
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
            <div className="max-w-2xl mx-auto">
                <ReportTopBar type="tube" target={name!.name} />
                <h4>Average daily number of passengers: {avgPassengers.data[0].average_passenger_count || "0"}</h4>
                <TubeTrips id={params.id} from={searchParams.from} to={searchParams.to}/>
                <h3>Generated power</h3>
                <LineChartComponent url={`http://localhost:3000/api/reports/getPowerStats?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels_key="time_of_measurement" data_key="generated_power" label_name="Power"/>
                <h3>Tube pressure</h3>
                <LineChartComponent url={`http://localhost:3000/api/reports/getPressureStats?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels_key="time_of_measurement" data_key="pressure" label_name="Pressure"/>
            </div>
        </>
    );
};

export default GenerateTubeReport;


export const dynamic = 'force-dynamic';