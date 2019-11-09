from django.contrib.auth.models import User
from django.test import TestCase
from datetime import datetime, timedelta

from bifrost_location.models import Location
from bifrost_timeline.models import Timeline


class BaseTestUtils(TestCase):

    def simple_setup(self):
        self.user = self.create_user()
        self.timeline = Timeline.objects.create(
            title='First timeline',
            user=self.user,
            starting_date=datetime.now(),
            ending_date=datetime.now() + timedelta(days=7))

    def create_user(self, username='dummy') -> User:
        """
        Creating a user.

        :param username: The username. Default to 'dummy'.

        :return: The user object we just created.
        """
        return User.objects.create(
            username=username,
            password='dummy_password'
        )

    def create_location(self):
        """
        Creating a dummy location and returning it.
        """
        return Location.objects.create(
            title='Dummy location',
            address='Awesome streat',
            lat=35.2658,
            long=35.9956
        )
