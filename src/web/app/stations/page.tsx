//@ts-nocheck
import React from "react";
import "../globals.css";
import prisma from "@/client";
import Station from "@/components/station";

const Stations = async () => {
    const stations = (await prisma.stations.findMany())
        .sort((s1, s2) => s1.station_id - s2.station_id)
        .map(s =>
            <div className="hyperloop-item w-2/3" key={s.station_id}>
                <Station station={s} />
            </div>);


    return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold pb-5'>Stations</h1>
            <div className="relative">
                <div className="hyperloop-grid">
                    {stations}
                </div>
            </div>
        </div>
    )
};

export default Stations;

export const dynamic = 'force-dynamic';
