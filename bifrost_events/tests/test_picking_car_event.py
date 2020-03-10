from bifrost.src.CommonTestUtils import BaseTestUtils
from datetime import datetime
from bifrost.src.ioc.ServiceContainer import Container


class TestPickingCar(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

    def test_picking_car_event(self):
        """
        Testing the car picking event.
        """
        picking_car = Container.picking_car_service().create(
            title='Dummy flight',
            starting_date=datetime.now(),
            timeline=self.timeline,
            agency="Hertz",
            type="BMW",
            license_number="OutOfTime",
            location=self.create_location())

        self.assertEquals(
            picking_car, self.user.timeline_set.first().pickingcar_set.first()
        )
