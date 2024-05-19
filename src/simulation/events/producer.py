import json
import os
from confluent_kafka import Producer
import socket

bootstrap_servers = os.getenv('KAFKA_BROKER', 'localhost:9092')

conf = {
    'bootstrap.servers': 'localhost:9092',
    'client.id': socket.gethostname()
}

producer = Producer(conf)

def produce(topic: str, event: object):
    serialized_event = serialize(event)
    producer.produce(topic, key=None, value=serialized_event)
    producer.poll(0)

def serialize(event: object):
    return json.dumps(event.__dict__)