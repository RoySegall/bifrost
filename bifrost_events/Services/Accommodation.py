from bifrost.src.ioc.Base import ServiceBase
from bifrost_events.models import Accommodation, Lunch


class Service(ServiceBase):
    # todo: combine all the events together.

    def info(self):
        return {
            'name': 'Accommodation service',
            'description': 'Manage accommodations',
        }

    def create(self, **kwargs):
        """
        Creating accommodation record in the DB.

        :param kwargs: Arguments of the accommodation model.

        :return: The accommodation service.
        """
        return Accommodation.objects.create(**kwargs)

    def create_lunch(self, **kwargs):
        """
        Creating a lunch event.

        :param kwargs: Arguments for the event.

        :return: The event object.
        """
        return Lunch.objects.create(**kwargs)
