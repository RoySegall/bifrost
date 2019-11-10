from django.test import TestCase
from bifrost.src.ioc.ServiceContainer import Container
from bifrost_events.Services.FlightService import FlightService


class TestServiceContainer(TestCase):

    def test_service_container_init(self):
        """
        Testing the service container is initialize and we pulling services of
        other packages.
        """

        Container.reset_services()
        flight = FlightService()

        self.assertEquals(Container.services['flight_service'], FlightService)
        self.assertEquals(Container.flight_service().info(), flight.info())
