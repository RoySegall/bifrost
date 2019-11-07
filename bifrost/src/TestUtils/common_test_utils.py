from django.contrib.auth.models import User
from django.test import TestCase
from datetime import datetime, timedelta
from bifrost_timeline.models import Timeline


class BaseTestUtils(TestCase):

    def simple_setup(self):
        self.user = User.objects.create(username='dummy', password='dummy_password')
        self.timeline = Timeline.objects.create(
            title='First timeline',
            user=self.user,
            starting_date=datetime.now(),
            ending_date=datetime.now() + timedelta(days=7))
