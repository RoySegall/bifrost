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
        accommodation = Container.event_service().create_accommodation(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
            hotel_name='Special Diabetes hotel',
            room='213',
        )

        self.assertEquals(
            self.user.timeline_set.first().accommodation_set.first(),
            accommodation
        )
