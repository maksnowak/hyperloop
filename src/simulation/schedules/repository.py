from datetime import datetime, timedelta
from random import randint
from db.connection import connect

class Schedule:
    def __init__(self, 
        schedule_id, 
        departure_time, 
        arrival_time, 
        status, 
        capsule_id, 
        start_station_id, 
        end_station_id, 
        previous_schedule_id
    ):
        self.schedule_id = schedule_id
        self.departure_time = departure_time
        self.arrival_time = arrival_time
        self.status = status
        self.capsule_id = capsule_id
        self.start_station_id = start_station_id
        self.end_station_id = end_station_id
        self.previous_schedule_id = previous_schedule_id


def get_schedule(schedule_id: int) -> Schedule:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT * 
                FROM schedule
                WHERE schedule_id = {schedule_id}
                """)
            
            schedule = cur.fetchone()
            if not schedule:
                return None

            return Schedule(*schedule)

def get_next_schedules(departure_from: float, departure_to: float) -> list[Schedule]:
    departure_from = datetime.fromtimestamp(departure_from).strftime('%H:%M:%S')
    departure_to = datetime.fromtimestamp(departure_to).strftime('%H:%M:%S')


    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT * 
                FROM schedule
                WHERE departure_time >= time '{departure_from}' 
                AND schedule.departure_time <= time '{departure_to}'
                """)
            
            schedules = cur.fetchall()

            if not schedules:
                return []
            
            return [Schedule(*schedule) for schedule in schedules]
        

def get_mock_schedule(capsule_id: int = 1, start_station_id: int = 2, end_station_id: int = 4) -> Schedule:
    departure_time = datetime.now().time()
    arrival_time = (datetime.now() + timedelta(minutes=30)).time()

    return Schedule(
        schedule_id=1,
        departure_time=departure_time,
        arrival_time=arrival_time,
        status='Active',
        capsule_id=capsule_id,
        start_station_id=start_station_id,
        end_station_id=end_station_id,
        previous_schedule_id=None
    )


def add_ride_history(schedule_id: int, passengers: int, cargo: int):
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                CALL create_trip_history(
                    referred_schedule_id := {schedule_id},
                    sold_tickets := {passengers},
                    weight_of_cargo := {cargo},
                    cargo_content := 'Example content'
                );
            """)

            conn.commit()