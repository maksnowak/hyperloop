import React from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "../../client";

export interface TubeDataProps {
    tube_id: number;
    name: string;
    length: number;
    max_speed: number;
    estimated_travel_time: Date;
    starting_station_id: number;
    ending_station_id: number;
    data_id: number | null;
    time_of_measurement: Date | null;
    pressure: number | null;
    generated_power: number | null;
    referred_tube_id: number | null;
}

const TubePage = async ({ params }: { params: { id: string } }) => {
    const tubes: TubeDataProps[] = await prisma.$queryRaw`SELECT * FROM tubes t left join tubes_data td on td.referred_tube_id = t.tube_id WHERE t.tube_id = CAST(${params.id} AS INTEGER)`;

    var data;
    if (tubes[0].pressure == null) {
        data = <center>
            <div className="hyperloop-item w-1/3">
                <h3>No data gathered</h3>
            </div>
        </center>
    } else {
        data = <div className="hyperloop-grid">
            {tubes.map(t => <>
                <div className="hyperloop-item w-2/3">
                    <h3>Data id: [{t.data_id}]</h3>
                    <p>Pressure: {t.pressure}</p>
                    <p>Generated solar power: {t.generated_power}</p>
                </div>
            </>)}
        </div>
    }

    return (
        <div>
            <Sidebar />
            <h1 className="text-center bold">{tubes[0].name}<br />Tube no. {params.id}</h1>
            {data}
        </div>
    );
};

export default TubePage;

export const dynamic = 'force-dynamic';
