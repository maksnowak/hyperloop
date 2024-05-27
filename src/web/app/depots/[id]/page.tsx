import React from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "@/client";
import Capsule from "@/components/capsule";

const DepotPage = async ({ params }: { params: { id: string } }) => {
    const depot = await prisma.depots.findFirst({
        where: { depot_id: Number(params.id) },
    });
    const capsules = (await prisma.capsules.findMany({
        where: { servicing_depot_id: Number(params.id) },
    })).sort((c1, c2) => c1.capsule_id - c2.capsule_id)
        .map((g) => <Capsule key={g.capsule_id} {...g} />);
    return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold pb-5'>Depot {depot!.name}</h1>
			<p className={'text-center bold'}>Latitude: {Number(depot!.latitude)}</p>
			<p className={'text-center bold'}>Longitude: {Number(depot!.longitude)}</p>
			<br />
			<h1 className={'text-center bold'}>Capsules serviced:</h1>
			<div className={'hyperloop-grid'}>{capsules}</div>
		</div>
	);
}

export default DepotPage;
