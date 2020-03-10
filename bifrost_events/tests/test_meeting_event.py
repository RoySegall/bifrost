from bifrost.src.CommonTestUtils import BaseTestUtils
from datetime import datetime
from bifrost.src.ioc.ServiceContainer import Container


class TestAccommodationEvent(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

    def test_accommodation_event_creation(self):
        """
        Testing the creation of accommodation event.
        """
        meeting = Container.accommodation_service().create_meeting(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
        )

        self.assertEquals(
            self.user.timeline_set.first().meeting_set.first(),
            meeting
        )
