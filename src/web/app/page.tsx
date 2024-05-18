import InteractiveMap from '@/components/location/interactiveMap';
import { io } from 'socket.io-client';
import prisma from '../client';

const socket = io();

export default async function Page() {
	const depotsPromise = prisma.depots.findMany();
	const stationsPromise = prisma.stations.findMany();
	const tubesPromise = prisma.tubes.findMany();

	const [depots, stations, tubes] = await Promise.all([depotsPromise, stationsPromise, tubesPromise]);

	return (
		<div className='h-screen'>
			<div className='h-5/6 rounded-lg overflow-hidden'>
				<InteractiveMap depots={depots} stations={stations} tubes={tubes} />
			</div>
		</div>
	);
}
