const { Kafka } = require('kafkajs');
const { loadEnvConfig } = require('@next/env');
const { env } = require('process');

loadEnvConfig('./');

const broker = env.KAFKA_BROKER || 'localhost:9092';

module.exports = {
	kafka: new Kafka({
		clientId: 'webapp',
		brokers: [broker],
	}),
};
