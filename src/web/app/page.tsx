import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
	// const trains = await prisma.trains.findMany();
	const capsules = await prisma.capsules.findMany();

	return (
		<div>
			<h1>🤡 ZBAZOWANE DANE TO JEST TEST 🤡</h1>
			{capsules.map((capsule) => (
				<div key={capsule.capsule_id}>
					<div>=========</div>
					<div>Capsule ID: {capsule.capsule_id}</div>
					<div>Model: {capsule.model}</div>
					<div>Producer: {capsule.producer}</div>
					<div>Status: {capsule.status}</div>
					<div>Seats: {capsule.seats}</div>
					<div>Cargo space: {capsule.cargo_space}</div>
				</div>
			))}
		</div>
	);
}

export const dynamic = 'force-dynamic';