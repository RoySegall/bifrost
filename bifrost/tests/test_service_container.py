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
        accommodation = Events.Service()

        # Checking accommodation service.
        self.assertEquals(
            Container.services['event_service'], Events.Service
        )
        self.assertEquals(
            Container.event_service().info(), accommodation.info()
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

        self.assertEquals(Container.services['event_service'],
                          Events.Service)

        # Swapping service and make sure we get another instance.
        Container.set_service('event_service', DummyService)
        self.assertEquals(Container.services['event_service'],
                          DummyService)
