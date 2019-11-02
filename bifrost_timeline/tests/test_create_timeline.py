from django.contrib.auth.models import User
from django.test import TestCase
from datetime import datetime, timedelta
from bifrost_timeline.models import Timeline


class TestCreateTimeline(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='dummy', password='dummy_password')
        self.timeline = Timeline.objects.create(
            title='First timeline',
            user=self.user,
            starting_date=datetime.now(),
            ending_date=datetime.now() + timedelta(days=7))

    def test_user_timeline_relationship(self):
        """
        Testing the timeline and the user relationship works.

        todo: move logic to service and test that one.
        """
        self.assertEquals(self.user.timeline_set.first(), self.timeline)
