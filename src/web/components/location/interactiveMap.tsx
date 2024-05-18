'use client';

import { useEffect, useMemo, useState } from 'react';
import { default as nextDynamic } from 'next/dynamic'; // I have to do it this way so the pipeline doesn't break

const InteractiveMap = ({ depots, stations, tubes }) => {
	const MapComponent = useMemo(
		() =>
			nextDynamic(() => import('@/components/location/map'), {
				loading: () => <p>A map is loading</p>,
				ssr: false,
			}),
		[]
	);

	return <MapComponent cle={[]} depots={depots} stations={stations} tubes={tubes} />;
};

export default InteractiveMap;
