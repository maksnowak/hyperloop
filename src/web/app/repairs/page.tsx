import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "@/client";
import FilteredRepairs from "./filtered_repairs";

const Repairs = async () => {
    const repairs = await prisma.repairs_history.findMany();
    const depots = await Promise.all(
        repairs.map(async (r) => await prisma.depots.findFirst({
            where: { depot_id: r.performing_depot_id },
        }))
    );
    const capsules = await Promise.all(
        depots.map(async (d) => await prisma.capsules.findFirst({
            where: { servicing_depot_id: d?.depot_id },
        }))
    );

    return (
        <div className='p-5'>
            <h1 className='text-4xl font-bold pb-5'>Repairs</h1>
            <FilteredRepairs repairs={repairs} depots={depots} capsules={capsules} />
        </div>
    )
};

export default Repairs;

export const dynamic = 'force-dynamic';
