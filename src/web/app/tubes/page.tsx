//@ts-nocheck
import React from "react";
import "@/app/globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "@/client";
import Tube from "@/components/tube";

const Tubes = async () => {
    const tubes = (await prisma.tubes.findMany())
        .map(t => <div key={t.tube_id} className="hyperloop-item w-2/3">
            <Tube tube={t} />
        </div >);

    return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold pb-5'>Tubes</h1>
            <br />
            <div className="hyperloop-grid">
                {tubes}
            </div>
        </div>
    );
};

export default Tubes;

export const dynamic = 'force-dynamic';
