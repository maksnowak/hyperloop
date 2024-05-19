// @ts-nocheck

import Sidebar from '@/components/sidebar';
import React, { useMemo } from 'react';
import '../globals.css';
import { default as nextDynamic } from 'next/dynamic'; // I have to do it this way so the pipeline doesn't break
import prisma from '../../client';

const Map = async () => {
	const MapComponent = useMemo(
		() =>
			nextDynamic(() => import('@/components/location/map'), {
				loading: () => <p>A map is loading</p>,
				ssr: false,
			}),
		[]
	);

	const capsule_location_events = await prisma.capsule_location_events.findMany();

	const depots = await prisma.depots.findMany();

	const stations = await prisma.stations.findMany();

	const tubes = await prisma.tubes.findMany();

	console.log(depots);
	return (
		<div className='relative'>
			<div className=''>
				<Sidebar />
			</div>
			<div className='ml-32'>
				<MapComponent cle={capsule_location_events} depots={depots} stations={stations} tubes={tubes} />
			</div>
		</div>
	);
};

export default Map;

export const dynamic = 'force-dynamic';
