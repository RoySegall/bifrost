from django.test import TestCase
from bifrost.src.ioc.ServiceContainer import Container
from bifrost_events.Services import Flight, Accommodation, \
    PickingCar, MeetingConjunction


class TestServiceContainer(TestCase):

    def test_service_container_init(self):
        """
        Testing the service container is initialize and we pulling services of
        other packages.
        """

        Container.reset_services()
        flight = Flight.Service()
        accommodation = Accommodation.Service()
        picking_car = PickingCar.Service()
        meeting_conjunction = MeetingConjunction.Service()

        # Checking flight service.
        self.assertEquals(Container.services['flight_service'], Flight.Service)
        self.assertEquals(Container.flight_service().info(), flight.info())

        # Checking accommodation service.
        self.assertEquals(
            Container.services['accommodation_service'], Accommodation.Service
        )
        self.assertEquals(
            Container.accommodation_service().info(), accommodation.info()
        )

        # Testing the picking car service.
        self.assertEquals(
            Container.services['picking_car_service'], PickingCar.Service
        )
        self.assertEquals(
            Container.picking_car_service().info(), picking_car.info()
        )

        # Testing the meeting conjunction service.
        self.assertEquals(
            Container.services['meeting_conjunction_service'],
            MeetingConjunction.Service
        )

        self.assertEquals(
            Container.meeting_conjunction_service().info(),
            meeting_conjunction.info()
        )

    def test_swap_service(self):
        """
        Testing that we can swap services.
        """
        class DummyService:
            pass

        self.assertEquals(Container.services['flight_service'], Flight.Service)

        # Swapping service and make sure we get another instance.
        Container.set_service('flight_service', DummyService)
        self.assertEquals(Container.services['flight_service'], DummyService)
