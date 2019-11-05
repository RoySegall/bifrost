from django.contrib.auth.models import User
from django.test import TestCase
from datetime import datetime, timedelta
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
        self.fail()

    def test_create_flight_with_connection(self):
        """
        Testing that a flight with a connection is working OK.

        todo: move logic to service and test that one.
        """
        self.fail()
