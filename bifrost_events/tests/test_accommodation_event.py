from bifrost.src.TestUtils.common_test_utils import BaseTestUtils
from bifrost_events.models import Accommodation
from datetime import datetime


class TestAccommodationEvent(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

    def test_accommodation_event_creation(self):
        """
        Testing the creation of accommodation event.

        todo: move to a service container.
        """
        accommodation = Accommodation.objects.create(
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
