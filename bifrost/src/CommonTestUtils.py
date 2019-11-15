from django.contrib.auth.models import User
from django.test import TestCase
from datetime import datetime, timedelta
from bifrost_location.models import Location
from bifrost_timeline.models import Timeline
from bifrost.src.ioc.ServiceContainer import Container


class BaseTestUtils(TestCase):

    def simple_setup(self):
        # Reset container.
        Container.reset_services()

        # Set up models.
        self.user = self.create_user()
        self.timeline = self.create_timeline(self.user)

    def create_user(self, username='dummy', password='dummy_password') -> User:
        """
        Creating a user.

        :param username: The username. Default to 'dummy'.
        :param password: The username password. Default to dummy password.

        :return: The user object we just created.
        """
        user = User.objects.create_user(username=username, password=password)

        return user

    def create_timeline(self, user) -> Timeline:
        """
        Creating a timeline object.

        :param user: The user which own the timeline.

        :return: The timeline object we just created.
        """
        return Timeline.objects.create(
            title='First timeline',
            user=user,
            starting_date=datetime.now(),
            ending_date=datetime.now() + timedelta(days=7)
        )

    def create_location(self) -> Location:
        """
        Creating a dummy location and returning it.

        :return: The location object we just created.
        """
        return Location.objects.create(
            title='Dummy location',
            address='Awesome streat',
            lat=35.2658,
            long=35.9956
        )

    def login(self, username, password='dummy_password'):
        """
        Login the user.

        :param username: The username.
        :param password: The password.

        """
        self.client.login(username=username, password=password)
        return self.client
