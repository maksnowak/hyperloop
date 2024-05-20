from random import uniform
from repairs.repository import Repair
from capsules.container import CapsulesContainer


def simulate_repair(repair: Repair):
    container = CapsulesContainer()
    shaked_position = [repair.depot_latitude + uniform(-0.0005, 0.0005), repair.depot_longitude]
    container.update_capsule(repair.capsule_id, shaked_position)
