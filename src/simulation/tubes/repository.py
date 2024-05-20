from datetime import datetime
from random import uniform
from db.connection import connect

ideal_pressure = 100.0
day_ideal_power = 2250.0
night_ideal_power = 500.0


def generate_pressure():
    return uniform(ideal_pressure - 5, ideal_pressure + 5)


def generate_power():
    if datetime.now().hour >= 22 or datetime.now().hour < 6:
        return uniform(night_ideal_power - 500, night_ideal_power + 150)
    else:
        return uniform(day_ideal_power - 150, day_ideal_power + 150)


class TubeData:
    def __init__(self, tube_id: int, pressure: float, generated_power: float):
        self.tube_id = tube_id
        self.pressure = pressure if pressure is not None else generate_pressure()
        self.generated_power = generated_power if generated_power is not None else generate_power()

class Tube:
    def __init__(self, tube_id: int):
        self.tube_id = tube_id

def get_tubes() -> list[Tube]:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT tube_id
                FROM tubes
            """)

            tubes = cur.fetchall()

            if not tubes:
                return []
            
            return [Tube(tube_id) for tube_id, in tubes]



def add_data(data: TubeData):
    with connect() as conn:
        with conn.cursor() as cur:
            measure_date = datetime.now().strftime('%Y-%m-%d')

            cur.execute(f"""
                INSERT INTO tubes_data (time_of_measurement, pressure, generated_power, referred_tube_id)
                VALUES ('{measure_date}', {data.pressure}, {data.generated_power}, {data.tube_id})
            """)

            conn.commit()