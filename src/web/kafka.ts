const { Kafka } = require('kafkajs');
const { env } = require('process');

const broker = env.KAFKA_BROKER || 'localhost:9092';

module.exports = {
	kafka: new Kafka({
		clientId: 'webapp',
		brokers: [broker],
	}),
};
