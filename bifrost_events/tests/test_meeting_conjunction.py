from datetime import datetime
from bifrost.src.TestUtils.common_test_utils import BaseTestUtils
from bifrost_events.models import MeetingConjunction


class TestMeetingConjunction(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

        self.alice = self.create_user('Alice')
        self.bob = self.create_user('Bob')

    def test_create_meeting_conjunction(self):
        """
        Testing the creation of a meeting conjunction.

        todo: move to a service container.
        """
        meeting_conjunction = MeetingConjunction.objects.create(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
            location='JFK airport',
        )

        meeting_conjunction.members.add(self.alice, self.bob)

        referenced_conjunctions = self.user.timeline_set.first().meetingconjunction_set.first()

        self.assertEquals(referenced_conjunctions, meeting_conjunction)
        self.assertTrue(self.alice in referenced_conjunctions.members.all())
        self.assertTrue(self.bob in referenced_conjunctions.members.all())
