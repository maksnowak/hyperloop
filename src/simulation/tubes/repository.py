from datetime import datetime
from random import uniform
from db.connection import connect

ideal_pressure = 100.0
day_ideal_power_per_km = 2.25
night_ideal_power_per_km = 0


def generate_pressure():
    return uniform(ideal_pressure - 5, ideal_pressure + 5)


def generate_power(tube_length: int):
    power_per_km = 0

    if datetime.now().hour >= 22 or datetime.now().hour < 6:
        power_per_km = uniform(night_ideal_power_per_km, night_ideal_power_per_km + 0.1)
    else:
        power_per_km = uniform(day_ideal_power_per_km -0.5, day_ideal_power_per_km + 0.5)

    return power_per_km * tube_length


class TubeData:
    def __init__(self, tube_id: int, length: int, pressure: float, generated_power: float):
        self.tube_id = tube_id
        self.length = length
        self.pressure = pressure if pressure is not None else generate_pressure()
        self.generated_power = generated_power if generated_power is not None else generate_power(length)

class Tube:
    def __init__(self, tube_id: int, length: int):
        self.tube_id = tube_id
        self.length = float(length)

def get_tubes() -> list[Tube]:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT tube_id, length
                FROM tubes
            """)

            tubes = cur.fetchall()

            if not tubes:
                return []
            
            return [Tube(*tube) for tube in tubes]



def add_data(data: TubeData):
    with connect() as conn:
        with conn.cursor() as cur:
            measure_date = datetime.now().strftime('%Y-%m-%d')

            cur.execute(f"""
                INSERT INTO tubes_data (time_of_measurement, pressure, generated_power, referred_tube_id)
                VALUES ('{measure_date}', {data.pressure}, {data.generated_power}, {data.tube_id})
            """)

            conn.commit()