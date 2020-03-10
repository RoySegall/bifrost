from bifrost.src.ioc.Base import ServiceBase
from bifrost_events.models import Accommodation, Lunch, Meeting, GeneralEvent, \
    Flight, MeetingConjunction, PickingCar


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Accommodation service',
            'description': 'Manage accommodations',
        }

    def create_accommodation(self, **kwargs):
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

    def create_flight_event(self, **kwargs):
        """
        Creating a flight service.

        :param kwargs: Arguments to pass to the flight model.

        :return: A flight service.
        """
        return Flight.objects.create(**kwargs)

    def create_meeting_conjunction(self, members, **kwargs):
        """
        Create the meeting conjunction object.

        :return:
        """
        meeting_conjunction = MeetingConjunction.objects.create(**kwargs)

        # Adding the members to the meeting conjunction.
        for member in members:
            meeting_conjunction.members.add(member)

        return meeting_conjunction

    def create_picking_car(self, **kwargs):
        """
        Create the picking car event.

        :param kwargs: Arguments to pass to the picking car create object.

        :return: A newly created picking car event.
        """
        return PickingCar.objects.create(**kwargs)
