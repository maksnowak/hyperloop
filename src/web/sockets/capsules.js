const { kafka } = require('../kafka.ts');

const setup = (io) => {
	io.of('/capsules').on('connection', async (socket) => {
		const consumer = kafka.consumer({ groupId: socket.id });

		await consumer.connect();
		await consumer.subscribe({ topic: 'hello', fromBeginning: false });

		consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				const value = message.value?.toString();
				const location = value ? JSON.parse(value) : null;

				if (!location) return;
				socket.emit('events', location);
			},
		});
	});

	io.on('disconnect', () => {
		console.log('a user disconnected');
	});
};

module.exports = {
	setup,
};
