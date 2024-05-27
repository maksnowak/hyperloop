from random import uniform
from db.connection import connect

class Capsule:
    def __init__(self, capsule_id: int, latitude: float, longitude: float, max_seats: int, max_cargo_space: int):
        self.capsule_id = capsule_id
        self.position = [float(latitude), float(longitude)]
        self.max_seats = max_seats
        self.max_cargo_space = max_cargo_space


default_posiiton = [49.883353, 19.493670] # Wadowice depot

def get_capsules():
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT capsule_id, seats, cargo_space
                FROM capsules
            """)

            capsules = cur.fetchall()

            # select capsule_id and last known position
            cur.execute(f"""
                SELECT sc.referred_capsule_id, st.latitude, st.longitude
                FROM schedule sc
                INNER JOIN stations st ON sc.next_station_id = st.station_id
                WHERE (sc.referred_capsule_id, sc.departure_time) IN (
                    SELECT referred_capsule_id, MIN(departure_time)
                    FROM schedule
                    WHERE departure_time >= LOCALTIME(0)
                    GROUP BY referred_capsule_id
                );
            """)

            initial_positions = cur.fetchall()
            initial_positions = {capsule_id: [latitude, longitude] for capsule_id, latitude, longitude in initial_positions}

            if not capsules:
                return []

            capsules_with_positions = []
            for capsule in capsules:
                capsule_id = capsule[0]
                position = initial_positions.get(capsule_id, default_posiiton)
                shaked_position = [float(position[0]) + uniform(-0.0005, 0.0005), float(position[1])]   # to imitate platforms
                max_seats = capsule[1]
                max_cargo_space = capsule[2]

                capsules_with_positions.append([capsule_id, *shaked_position, max_seats, max_cargo_space])

            return [Capsule(*capsule) for capsule in capsules_with_positions]