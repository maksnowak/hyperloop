//@ts-nocheck
import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "../client";
import Station from "@/components/station";

const Stations = async () => {
    const stations = (await prisma.stations.findMany())
        .sort((s1, s2) => s1.station_id - s2.station_id)
        .map(s =>
            <div key={s.station_id}>
                <Station station={s} />
            </div>);


    return (
        <>
            <h1 className="text-center bold">Stations</h1>
            <div className="relative">
                <Sidebar />
                <div className="hyperloop-grid">
                    {stations}
                </div>
            </div>
        </>
    )
};

export default Stations;

export const dynamic = 'force-dynamic';
