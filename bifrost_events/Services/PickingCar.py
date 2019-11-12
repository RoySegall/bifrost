from bifrost.src.ioc.Base import ServiceBase
from bifrost_events.models import PickingCar


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Picking car service',
            'description': 'Manage picking cars events',
        }

    def create(self, **kwargs):
        """
        Create the picking car event.

        :param kwargs: Arguments to pass to the picking car create object.

        :return: A newly created picking car event.
        """
        return PickingCar.objects.create(**kwargs)
