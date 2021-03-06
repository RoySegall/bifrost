from datetime import datetime
from bifrost.src.CommonTestUtils import BaseTestUtils
from bifrost.src.ioc.ServiceContainer import Container


class TestMeetingConjunction(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

        self.alice = self.create_user('Alice')
        self.bob = self.create_user('Bob')

    def test_create_meeting_conjunction(self):
        """
        Testing the creation of a meeting conjunction.
        """
        create_meeting_conjunction_kwargs = {
            'members': (self.alice, self.bob),
            'title': 'Dummy flight',
            'starting_date': datetime.now(),
            'timeline': self.timeline,
            'location': self.create_location()
        }
        meeting_conjunction = Container.events_service()\
            .create_meeting_conjunction(**create_meeting_conjunction_kwargs)

        referenced_conjunctions = self.user.timeline_set.first()\
            .meetingconjunction_set.first()

        self.assertEquals(referenced_conjunctions, meeting_conjunction)
        self.assertTrue(self.alice in referenced_conjunctions.members.all())
        self.assertTrue(self.bob in referenced_conjunctions.members.all())
