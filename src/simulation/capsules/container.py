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
        owned_capsules = self.capsules if self.capsules else []
        owned_capsules_ids = [capsule.capsule_id for capsule in owned_capsules]
        
        current_capsules = get_capsules()
        current_capsules_ids = [capsule.capsule_id for capsule in current_capsules]

        # remove capsules that are not owned anymore
        owned_capsules = [capsule for capsule in owned_capsules if capsule.capsule_id in current_capsules_ids]

        # add new capsules
        for capsule in current_capsules:
            if capsule.capsule_id not in owned_capsules_ids:
                owned_capsules.append(capsule)

        self.capsules = owned_capsules

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