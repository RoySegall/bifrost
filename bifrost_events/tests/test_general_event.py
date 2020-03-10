from bifrost.src.CommonTestUtils import BaseTestUtils
from datetime import datetime
from bifrost.src.ioc.ServiceContainer import Container


class TestGeneralEvent(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

    def test_accommodation_event_creation(self):
        """
        Testing the creation of accommodation event.
        """
        meeting = Container.event_service().create_general_event(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
        )

        self.assertEquals(
            self.user.timeline_set.first().generalevent_set.first(),
            meeting
        )
