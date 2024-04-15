import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
	const trains = await prisma.trains.findMany();

	return (
		<div>
			<h1>Home</h1>
			{trains.map((train) => (
				<div key={train.id}>Train - {train.id}</div>
			))}
		</div>
	);
}
