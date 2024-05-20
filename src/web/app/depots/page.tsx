import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import Depot from "@/components/depot";
import prisma from "@/client";

const Depots = async () => {
    const depots = await prisma.depots.findMany();

    return (
        <div className='p-5'>
            <h1 className='text-4xl font-bold pb-5'>Depots</h1>
            <div className='hyperloop-grid'>
                {depots.map((depot) => {
                    return <Depot key={depot.depot_id} {...depot} />;
                })}
            </div>
        </div>
	);
};

export default Depots;

export const dynamic = 'force-dynamic';
