import InteractiveMap from '@/components/location/interactiveMap';
import prisma from '../client';
import { toClientComponentProps } from '@/utils/rendering';

const fix = (a: any) => JSON.parse(JSON.stringify(a));


export default async function Page() {
	const capsulesPromise = prisma.capsules.findMany();
	const depotsPromise = prisma.depots.findMany();
	const stationsPromise = prisma.stations.findMany();
	const tubesPromise = prisma.tubes.findMany();

	const [capsules, depots, stations, tubes] = await Promise.all([capsulesPromise, depotsPromise, stationsPromise, tubesPromise]);

	console.log(capsules);
	

	return (
		<div className='h-full'>
			<InteractiveMap
				capsules={toClientComponentProps(capsules)}
				depots={toClientComponentProps(depots)}
				stations={toClientComponentProps(stations)}
				tubes={toClientComponentProps(tubes)}
			/>
		</div>
	);
}
