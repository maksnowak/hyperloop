import time
from tubes.repository import Tube, TubeData, add_data, get_tubes
from utils.singleton import SingletonMeta


class TubesContainer(metaclass=SingletonMeta):
    def __init__(self, tubes: list[Tube] = []):
        self.tubes = tubes

        if not self.tubes:
            self.fetch()

        self.tubes_data = {tube.tube_id: TubeData(tube.tube_id, None, None) for tube in self.tubes}

    def fetch(self):
        self.tubes = get_tubes()

    def get_tube(self, tube_id: int):
        for tube in self.tubes:
            if tube.tube_id == tube_id:
                return tube

        return None

    def update_data(self, tube_id: int, pressure: float, generated_power: float):
        tube = self.get_tube(tube_id)
        if not tube:
            return
        
        self.tubes_data[tube_id] = TubeData(tube_id, pressure, generated_power)


    def heartbeat(self, interval: float):
        while True:
            for data in self.tubes_data.values():
                add_data(data)

            time.sleep(interval)