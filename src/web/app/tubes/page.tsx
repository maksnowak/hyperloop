import React from "react";
import "@/app/globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "@/app/client";
import Tube from "@/components/tube";

const Tubes = async () => {
    const tubes = (await prisma.tubes.findMany())
        .map(t => <div className="hyperloop-item w-2/3">
            <Tube key={t.tube_id} tube={t} />
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
