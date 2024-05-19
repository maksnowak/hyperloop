from datetime import time
import time
from schedules.repository import get_next_schedules
from capsules.ride import simulate_ride
from capsules.container import CapsulesContainer
import threading

heartbeat_interval = 0.1
check_interval = 60

def simulate():    
    heartbeat_thread = threading.Thread(target=lambda i: CapsulesContainer().heartbeat(i), args=(heartbeat_interval,))
    heartbeat_thread.start()

    while True:
        now = time.time()
        schedules = get_next_schedules(now, now + check_interval)

        if not schedules:
            print('No schedules found')

        for schedule in schedules:
            simulation_thread = threading.Thread(target=lambda s: simulate_ride(s), args=(schedule,))
            simulation_thread.start()

        time.sleep(check_interval)
