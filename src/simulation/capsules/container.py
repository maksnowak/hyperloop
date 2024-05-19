import time
import uuid
from events.producer import produce
from capsules.repository import Capsule, get_capsules
from utils.singleton import SingletonMeta


class CapsuleLocationEvent:
    def __init__(self, capsule_id: int, position: list):
        self.latitude = position[0]
        self.longitude = position[1]
        self.referredCapsuleId = capsule_id
        self.timestamp = time.time()
        self.eventId = str(uuid.uuid4())

class CapsulesContainer(metaclass=SingletonMeta):
    def __init__(self, capsules: list[Capsule] = []):
        self.capsules = capsules

        if not self.capsules:
            self.fetch()

    def fetch(self):
        self.capsules = get_capsules()

    def get_capsule(self, capsule_id: int):
        for capsule in self.capsules:
            if capsule.capsule_id == capsule_id:
                return capsule

        return None
    
    def update_capsule(self, capsule_id: int, position: list):
        capsule = self.get_capsule(capsule_id)
        if not capsule:
            return
        
        capsule.position = position

    def heartbeat(self, interval: float):
        while True:
            for capsule in self.capsules:
                event = CapsuleLocationEvent(capsule.capsule_id, capsule.position)
                produce("hello", event)
            
            time.sleep(interval)