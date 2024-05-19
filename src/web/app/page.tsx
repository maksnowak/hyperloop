'use client';

import { useMemo } from 'react';
import { default as nextDynamic } from 'next/dynamic'; // I have to do it this way so the pipeline doesn't break
import { Spinner } from '@nextui-org/react';


const loading = () => (
	<div className='w-full h-full flex items-center justify-center'>
		<Spinner />
	</div>
);

export default function Page() {
	const MapComponent = useMemo(
		() =>
			nextDynamic(() => import('@/components/location/map'), {
				loading: loading,
				ssr: false,
			}),
		[]
	);

	return (
		<div className='h-full'>
			<MapComponent />
		</div>
	);
}
