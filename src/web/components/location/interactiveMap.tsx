'use client';

import { useEffect, useMemo, useState } from 'react';
import { default as nextDynamic } from 'next/dynamic'; // I have to do it this way so the pipeline doesn't break
import { Spinner } from '@nextui-org/react';

interface InteractiveMapProps {
	capsules: any[];
	depots: any[];
	stations: any[];
	tubes: any[];
}

const loading = () => (
	<div className='w-full h-full flex items-center justify-center'>
		<Spinner />
	</div>
);

const InteractiveMap = ({ capsules, depots, stations, tubes }: InteractiveMapProps) => {
	const MapComponent = useMemo(
		() =>
			nextDynamic(() => import('@/components/location/map'), {
				loading: loading,
				ssr: false,
			}),
		[]
	);

	return <MapComponent capsules={capsules} depots={depots} stations={stations} tubes={tubes} />;
};

export default InteractiveMap;
