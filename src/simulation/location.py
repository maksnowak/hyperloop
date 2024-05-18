import json
import time
import uuid
from confluent_kafka import Producer
import socket

conf = {
    'bootstrap.servers': 'localhost:9092',
    'client.id': socket.gethostname()
}

producer = Producer(conf)
topic = 'hello'

sample_in_s = 0.1

class CapsuleLocationEvent:
    def __init__(self, latitude: float, longitude: float, capsule_id: int):
        self.latitude = latitude
        self.longitude = longitude
        self.referredCapsuleId = capsule_id
        self.timestamp = time.time()
        self.eventId = str(uuid.uuid4())

def distance(a: list, b: list):
    a_x, a_y = a
    b_x, b_y = b

    return ((a_x - b_x) ** 2 + (a_y - b_y) ** 2) ** 0.5

def notify_location(event: CapsuleLocationEvent):
    serialized_event = json.dumps(event.__dict__)
    print(f'Notifying location: {serialized_event}')
    producer.produce(topic, key=None, value=serialized_event)
    producer.poll(0)

startingPosition = [52.232149, 21.006627]
endingPosition = [50.866077, 20.628568]
traceDistance = distance(startingPosition, endingPosition)
speed = 0.001
capsule_id = 22

direction = [
    (endingPosition[0] - startingPosition[0]) / traceDistance, 
    (endingPosition[1] - startingPosition[1]) / traceDistance
]

next_position = startingPosition
while distance(next_position, endingPosition) > 0.1:
    time.sleep(sample_in_s)

    notify_location(CapsuleLocationEvent(next_position[0], next_position[1], capsule_id))
    next_position = [next_position[0] + direction[0] * speed, next_position[1] + direction[1] * speed]

next_position = endingPosition
notify_location(CapsuleLocationEvent(next_position[0], next_position[1], capsule_id))