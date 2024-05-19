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

            print(f'Found station: {station}')
            return Station(*station)