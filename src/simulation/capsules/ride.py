from datetime import datetime, date
from random import randint
import time
from schedules.repository import Schedule, add_ride_history
from capsules.container import CapsulesContainer
from stations.repository import get_station, log_passengers_arrival


def wait_for_departure(schedule: Schedule):
    print(f'Waiting for departure for schedule {schedule.schedule_id} with capsule {schedule.capsule_id}')

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

    container = CapsulesContainer()
    capsule = container.get_capsule(schedule.capsule_id)

    # ---
    passengers = randint(1, capsule.max_seats)
    cargo = randint(1, capsule.max_cargo_space)

    add_ride_history(schedule.schedule_id, passengers, cargo)
    log_passengers_arrival(schedule.end_station_id, passengers)
    # --- 

    arrival_datetime = datetime.combine(date.today(), schedule.arrival_time)
    departure_datetime = datetime.combine(date.today(), schedule.departure_time)

    start_station = get_station(schedule.start_station_id)
    end_station = get_station(schedule.end_station_id)

    print(f'Simulating ride for schedule {schedule.schedule_id} with capsule {schedule.capsule_id} from {start_station.name} to {end_station.name}')

    sample_time = 100  # 100 milliseconds
    route_duration_in_ms = (arrival_datetime - departure_datetime).total_seconds() * 1000

    now = datetime.now()
    while now < arrival_datetime:
        time.sleep(sample_time / 1000)

        route_elapsed_in_ms = (now - departure_datetime).total_seconds() * 1000
        progress = route_elapsed_in_ms / route_duration_in_ms

        current_position = [
            start_station.latitude + (end_station.latitude - start_station.latitude) * progress,
            start_station.longitude + (end_station.longitude - start_station.longitude) * progress
        ]
        container.update_capsule(schedule.capsule_id, current_position)

        now = datetime.now()

    current_position = [end_station.latitude, end_station.longitude]
    container.update_capsule(schedule.capsule_id, current_position)

    print(f'Ride simulation for schedule {schedule.schedule_id} with capsule {schedule.capsule_id} from {start_station.name} to {end_station.name} completed')

    passengers = randint(1, capsule.max_seats)
    cargo = randint(1, capsule.max_cargo_space)

    add_ride_history(schedule.schedule_id, passengers, cargo)
    log_passengers_arrival(schedule.end_station_id, passengers)