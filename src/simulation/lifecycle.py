from datetime import time
import time
from schedules.repository import get_next_schedules
from capsules.ride import simulate_ride
import threading

check_interval = 60

def simulate():
    while True:
        now = time.time()
        schedules = get_next_schedules(now, now + check_interval)

        if not schedules:
            print('No schedules found')

        for schedule in schedules:
            simulation_thread = threading.Thread(target=lambda s: simulate_ride(s), args=(schedule,))
            simulation_thread.start()

        time.sleep(check_interval)
