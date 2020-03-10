from bifrost.src.CommonTestUtils import BaseTestUtils
from datetime import datetime
from bifrost.src.ioc.ServiceContainer import Container


class TestLunchEvent(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

    def test_lunch_event(self):
        """
        Testing the lunch event.
        """
        lunch = Container.accommodation_service().create_lunch(
            title='Lunch',
            starting_date=datetime.now(),
            timeline=self.timeline,
            location=self.create_location()
        )

        self.assertEquals(
            lunch, self.user.timeline_set.first().lunch_set.first()
        )
