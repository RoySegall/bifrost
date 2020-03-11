from django.test import TestCase
from bifrost.src.ioc.ServiceContainer import Container
from bifrost_events.Services import Events
from bifrost_location.Services import Location


class TestServiceContainer(TestCase):

    def test_service_container_init(self):
        """
        Testing the service container is initialize and we pulling services of
        other packages.
        """

        Container.reset_services()

        # Checking event service.
        self.assertEquals(
            Container.services['events_service'],
            Events.Service
        )
        self.assertEquals(
            Container.events_service().info(),
            Events.Service().info()
        )

        # Testing location service.
        self.assertEquals(
            Container.services['location_service'],
            Location.Service
        )

    def test_swap_service(self):
        """
        Testing that we can swap services.
        """
        class DummyService:
            pass

        self.assertEquals(Container.services['events_service'],
                          Events.Service)

        # Swapping service and make sure we get another instance.
        Container.set_service('events_service', DummyService)
        self.assertEquals(Container.services['events_service'],
                          DummyService)
