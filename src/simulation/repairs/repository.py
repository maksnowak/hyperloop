
from db.connection import connect


class Repair:
    def __init__(self, repair_id, capsule_id, depot_id, depot_latitude, depot_longitude):
        self.repair_id = repair_id
        self.capsule_id = capsule_id
        self.depot_id = depot_id
        self.depot_latitude = float(depot_latitude)
        self.depot_longitude = float(depot_longitude)

def get_active_repairs():
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT repair_id, referred_capsule_id, performing_depot_id, latitude, longitude
                FROM repairs_history
                INNER JOIN depots d ON d.depot_id = performing_depot_id
                WHERE date_end IS NULL
            """)

            repairs = cur.fetchall()

            if not repairs:
                return []
            
            return [Repair(*repair) for repair in repairs]
