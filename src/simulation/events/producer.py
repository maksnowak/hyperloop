import json
import os
from confluent_kafka import Producer
import socket

producer = None 

def setup():
    global producer
    bootstrap_servers = os.getenv('KAFKA_BROKER', 'localhost:9092')

    conf = {
        'bootstrap.servers': bootstrap_servers,
        'client.id': socket.gethostname()
    }

    producer = Producer(conf)


def produce(topic: str, event: object):
    global producer
    if not producer:
        setup()

    serialized_event = serialize(event)
    producer.produce(topic, key=None, value=serialized_event)
    producer.poll(0)

def serialize(event: object):
    return json.dumps(event.__dict__)