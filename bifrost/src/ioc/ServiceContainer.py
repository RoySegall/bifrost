from bifrost.signals import ServiceContainerInit
from bifrost_events.Services import FlightService


class Container:

    services = {}

    @staticmethod
    def reset_services():
        """
        Starting the service container. The service container initialise process
        have a couple of steps:
            1. Send signal that the service container is starting.
            2. Collection definitions of references for services provided by the
                packages.
        :return:
        """
        service_init = ServiceContainerInit()
        service_init.notify_listeners()

    @staticmethod
    def get_service(service_name):
        """
        Get a service from the container by name.

        :param service_name: The service name.

        :return: The service object.
        """
        return Container.services[service_name]()

    @staticmethod
    def set_service(service_name, reference):
        """
        Set a service. You might want to use it when building the container
        manually in testing or when we need to swap services during tests.

        :param service_name: The service name.
        :param reference: The service reference.
        """
        Container.services[service_name] = reference

    @staticmethod
    def flight_service() -> FlightService:
        return Container.get_service('flight_service')
