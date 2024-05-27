import "@/app/globals.css"
import FilteredRides from "./filtered_rides";
import { DetailedTripProps } from "./filtered_rides";
import prisma from "@/client";

const RideHistoryPage = async ({ }: { params: { id: string } }) => {
    const trips: DetailedTripProps[] = await prisma.$queryRaw`SELECT * FROM trips_history th JOIN tubes t on t.tube_id = th.referred_tube_id`;

    return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold pb-5'>Ride history</h1>
			<FilteredRides trips={trips} />
		</div>
	);
};

export default RideHistoryPage;

export const dynamic = 'force-dynamic';
