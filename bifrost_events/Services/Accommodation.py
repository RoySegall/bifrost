from bifrost.src.ioc.Base import ServiceBase
from bifrost_events.models import Accommodation, Lunch, Meeting, GeneralEvent


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

    def create_meeting(self, **kwargs):
        """
        Creating a meeting event.

        :param kwargs: Arguments for the event.

        :return: The meeting object.
        """
        return Meeting.objects.create(**kwargs)

    def create_general_event(self, **kwargs):
        """
        Creating a general event.

        :param kwargs: Arguments for the event.

        :return: The meeting object.
        """
        return GeneralEvent.objects.create(**kwargs)
