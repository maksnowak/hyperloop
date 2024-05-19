from datetime import datetime, date
import time
import uuid
from schedules.repository import Schedule
from events.producer import produce
from stations.repository import get_station


class CapsuleLocationEvent:
    def __init__(self, latitude: float, longitude: float, capsule_id: int):
        self.latitude = latitude
        self.longitude = longitude
        self.referredCapsuleId = capsule_id
        self.timestamp = time.time()
        self.eventId = str(uuid.uuid4())


def wait_for_departure(schedule: Schedule):
    current_date = date.today()
    departure_timestamp = datetime.combine(current_date, schedule.departure_time).timestamp()

    while time.time() < departure_timestamp:
        time.sleep(1)

def distance(a: list, b: list):
    a_x, a_y = a
    b_x, b_y = b

    return ((a_x - b_x) ** 2 + (a_y - b_y) ** 2) ** 0.5

def simulate_ride(schedule: Schedule):
    if not schedule:
        print(f'Schedule not found')
        return
    
    wait_for_departure(schedule)
    
    print(f'Simulating ride for schedule {schedule.schedule_id}')

    arrival_datetime = datetime.combine(date.today(), schedule.arrival_time)
    departure_datetime = datetime.combine(date.today(), schedule.departure_time)

    start_station = get_station(schedule.start_station_id)
    end_station = get_station(schedule.end_station_id)

    start_position = [start_station.latitude, start_station.longitude]
    end_position = [end_station.latitude, end_station.longitude]

    trace_distance = distance(start_position, end_position)
    trace_duration = (arrival_datetime - departure_datetime).total_seconds()

    sample_time = 0.1 # 100 milliseconds
    speed = trace_distance / trace_duration if trace_duration != 0 else 0

    sampled_speed = speed * sample_time

    direction = [
        (end_position[0] - start_position[0]) / trace_distance, 
        (end_position[1] - start_position[1]) / trace_distance
    ]

    next_position = start_position
    while distance(next_position, end_position) > sampled_speed:
        time.sleep(sample_time)

        produce('hello', CapsuleLocationEvent(next_position[0], next_position[1], schedule.capsule_id))
        next_position = [next_position[0] + direction[0] * sampled_speed, next_position[1] + direction[1] * sampled_speed]

    next_position = end_position
    produce('hello', CapsuleLocationEvent(next_position[0], next_position[1], schedule.capsule_id))

    print(f'Ride simulation for schedule {schedule.schedule_id} completed')