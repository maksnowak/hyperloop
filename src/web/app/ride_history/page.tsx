import "@/app/globals.css"
import Sidebar from "@/components/sidebar";
import FilteredRides from "./filtered_rides";
import { DetailedTripProps } from "./filtered_rides";
import prisma from "@/client";

const RideHistoryPage = async ({ }: { params: { id: string } }) => {
    const trips: DetailedTripProps[] = await prisma.$queryRaw`SELECT * FROM trips_history th JOIN tubes t on t.tube_id = th.referred_tube_id`;

    return (
        <div>
            <Sidebar />
            <h1 className="text-center bold">Ride history</h1>
            <FilteredRides trips={trips} />
        </div>
    );
};

export default RideHistoryPage;

export const dynamic = 'force-dynamic';
