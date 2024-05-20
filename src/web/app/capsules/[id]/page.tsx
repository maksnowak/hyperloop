import React from "react";
import "@/app/globals.css";
import prisma from "@/client";
import RepairActionButton from "@/components/repairActionButton";
import FilteredCapsuleRepairs from "@/components/filteredCapsuleRepairs";

const RepairsPage = async ({ params }: { params: { id: string } }) => {
    var repairs = await prisma.repairs_history.findMany({
        where: {
            referred_capsule_id: Number(params.id),
        },
    });
    const depots = await Promise.all(
        repairs.map(async (r) => await prisma.depots.findFirst({
            where: { depot_id: r.performing_depot_id },
        }))
    );
    const capsule = await prisma.capsules.findFirst({
        where: { capsule_id: Number(params.id) },
    });

    return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold pb-5'>Repairs for capsule no. {params.id}</h1>
            <h3 className='text-center bold'>Current status: {capsule!.status}</h3>
            <RepairActionButton status={capsule!.status} capsule_id={capsule!.capsule_id} />
			<FilteredCapsuleRepairs repairs={repairs} depots={depots} capsule_id={capsule!.capsule_id} />
		</div>
	);
};

export default RepairsPage;
