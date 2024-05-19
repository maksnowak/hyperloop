from datetime import datetime
from db.connection import connect

class Station:
    def __init__(self, station_id, name, latitude, longitude, platforms):
        self.station_id = station_id
        self.name = name
        self.latitude = float(latitude)
        self.longitude = float(longitude)
        self.platforms = platforms

def get_station(station_id: int):
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT *
                FROM stations
                WHERE station_id = {station_id}
                """)
            
            station = cur.fetchone()
            
            if not station:
                return None

            return Station(*station)
        
def log_passengers_arrival(station_id: int, passengers: int):
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                insert into station_logs ("date", passengers_served, referred_station_id)
                values ('{datetime.now().strftime('%Y-%m-%d')}',{passengers}, {station_id});
            """)

            conn.commit()