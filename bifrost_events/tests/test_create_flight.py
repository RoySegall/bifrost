from django.contrib.auth.models import User
from django.test import TestCase
from datetime import datetime, timedelta
from bifrost_events.models import Flight
from bifrost_timeline.models import Timeline


class TestCreateFlight(TestCase):
    """
    Testing the flight model.
    """

    def setUp(self):
        self.user = User.objects.create(username='dummy', password='dummy_password')
        self.timeline = Timeline.objects.create(
            title='First timeline',
            user=self.user,
            starting_date=datetime.now(),
            ending_date=datetime.now() + timedelta(days=7))

    def test_create_flight(self):
        """
        Testing the creation of a flight.

        todo: move logic to service and test that one.
        """
        flight = Flight.objects.create(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
            origin='House of cats',
            destination='Another house of cats',
            extra_info='Keep calm'
        )

        self.assertEquals(self.user.timeline_set.first().flight_set.first(), flight)

    def test_create_flight_with_connection(self):
        """
        Testing that a flight with a connection is working OK.

        todo: move logic to service and test that one.
        """
        first_flight = Flight.objects.create(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
            origin='House of cats',
            destination='Another house of cats',
            extra_info='Keep calm'
        )

        second_flight = Flight.objects.create(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
            origin='House of cats',
            destination='Another house of cats',
            extra_info='Keep calm',
            connection_flight=first_flight
        )

        referenced_flights = self.user.timeline_set.first().flight_set.all()

        self.assertEquals(referenced_flights[0], first_flight)
        self.assertEquals(referenced_flights[1], second_flight)
        self.assertEquals(second_flight.connection_flight, first_flight)
