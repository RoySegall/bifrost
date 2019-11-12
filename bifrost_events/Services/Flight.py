from bifrost.src.ioc.Base import ServiceBase
from bifrost_events.models import Flight


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Flight service',
            'description': 'Manage flights',
        }

    def create(self, **kwargs):
        """
        Creating a flight service.

        :param kwargs: Arguments to pass to the flight model.

        :return: A flight service.
        """
        return Flight.objects.create(**kwargs)

