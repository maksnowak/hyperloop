import React from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "../../client";

const TubePage = async ({ params }: { params: { id: string } }) => {
    const tubes = await prisma.$queryRaw`SELECT * FROM tubes t left join tubes_data td on td.referred_tube_id = t.tube_id WHERE t.tube_id = CAST(${params.id} AS INTEGER)`;

    var data;
    if (!tubes[0].pressure) {
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
