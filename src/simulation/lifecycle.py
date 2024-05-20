from datetime import time
import time
from schedules.repository import get_next_schedules
from capsules.ride import simulate_ride
from capsules.container import CapsulesContainer
import threading

from repairs.repair import simulate_repair
from repairs.repository import get_active_repairs

heartbeat_interval = 0.1
check_interval = 15

def simulate():    
    heartbeat_thread = threading.Thread(target=lambda i: CapsulesContainer().heartbeat(i), args=(heartbeat_interval,))
    heartbeat_thread.start()

    last_check = time.time()

    while True:
        check_to = last_check + check_interval
        schedules = get_next_schedules(last_check, check_to)

        last_check = check_to

        if not schedules:
            print('No schedules found')

        for schedule in schedules:
            simulation_thread = threading.Thread(target=lambda s: simulate_ride(s), args=(schedule,))
            simulation_thread.start()
            
        repairs = get_active_repairs()

        for repair in repairs:
            repair_thread = threading.Thread(target=lambda r: simulate_repair(r), args=(repair,))
            repair_thread.start()

        time.sleep(check_interval)
