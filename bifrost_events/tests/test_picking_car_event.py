from bifrost.src.TestUtils.common_test_utils import BaseTestUtils
from bifrost_events.models import PickingCar
from datetime import datetime


class TestPickingCar(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

    def test_picking_car_event(self):
        """
        Testing the car picking event.

        todo: move the logic to a service.
        """
        picking_car = PickingCar.objects.create(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
            agency="Hertz",
            type="BMW",
            license_number="OutOfTime",
            location=self.create_location()
        )

        self.assertEquals(
            picking_car, self.user.timeline_set.first().pickingcar_set.first()
        )
