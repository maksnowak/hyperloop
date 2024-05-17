import "@/app/globals.css"
import Sidebar from "@/components/sidebar";
import Trip from "@/components/trip";

const RideHistoryPage = async ({ params }: { params: { id: string } }) => {
    const trips = await prisma.$queryRaw`SELECT * FROM trips_history th JOIN tubes t on t.tube_id = th.referred_tube_id WHERE referred_capsule_id = CAST(${params.id} AS INTEGER)`;

    // const depots = await Promise.all(
    //     repairs.map(async (r) => await prisma.depots.findFirst({
    //         where: { depot_id: r.performing_depot_id },
    //     }))
    // );
    // const capsule = await prisma.capsules.findFirst({
    //     where: { capsule_id: Number(params.id) },
    // });

    return (
        <div>
            <Sidebar />
            <h1 className="text-center bold">Ride history for capsule no. {params.id}</h1>
            <div className="hyperloop-grid">
                {trips.map(t => <div>
                    <Trip key={t.ride_id} trip={t} tube={t.name} />
                </div>)}
            </div>
        </div>
    );
};

export default RideHistoryPage;
