from tubes.container import TubesContainer
from tubes.repository import Tube, generate_power, generate_pressure


def simulate_measurement(tube: Tube):
    measured_pressure = generate_pressure()
    measured_power = generate_power(tube.length)

    container = TubesContainer()
    container.update_data(tube.tube_id, measured_pressure, measured_power)