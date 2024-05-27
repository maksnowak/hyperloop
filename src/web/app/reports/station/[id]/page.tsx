"use client";
import React from "react";
import "@/app/globals.css";
import ReportTopBar from "@/components/reportTopBar";
import StationPassengers from "@/components/stationPassengers";
import StationTraffic from "@/components/stationTraffic";
import prisma from "@/client";
import BarChartComponent from "@/components/barChart";

const GenerateStationReport = ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string }
}) => {
    const [name, setName] = React.useState({name: ""});
    React.useEffect(() => {
        fetch(`api/stations/getStation?station_id=${params.id}`).then((response) => response.json()).then((data) => {
            setName(data);
        });
    }, []);
    return (
        <>
            <div className="max-w-2xl mx-auto">
                <ReportTopBar type="station" target={name!.name} />
                <StationPassengers id={params.id} from={searchParams.from} to={searchParams.to}/>
                <h3>Passenger flow</h3>
                <BarChartComponent url={`/api/reports/getPassengerFlow?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels={['passengers_in', 'passengers_out']} label_names={['Arriving passengers', 'Departing passengers']} />
                <StationTraffic id={params.id} from={searchParams.from} to={searchParams.to}/>
                <h3>Trips flow</h3>
                <BarChartComponent url={`/api/reports/getPassengerFlow?id=${params.id}&from=${searchParams.from}&to=${searchParams.to}`} labels={['trips_in', 'trips_out']} label_names={['Arrivals', 'Departures']} />
            </div>
        </>
    );
};

export default GenerateStationReport;

export const dynamic = 'force-dynamic';