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
        <>
            <h1 className="text-center">Tubes</h1>
            <Sidebar />
            <br />
            <div className="hyperloop-grid">
                {tubes}
            </div>
        </>
    );
};

export default Tubes;

export const dynamic = 'force-dynamic';
