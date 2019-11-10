from django.test import TestCase

from bifrost.src.ioc.ServiceContainer import Container


class TestServiceContainer(TestCase):

    def test_service_container_init(self):
        """
        Testing the service container is initialize and we pulling services of
        other packages.
        """

        container = Container()

        self.assertIsNotNone(container.services)
