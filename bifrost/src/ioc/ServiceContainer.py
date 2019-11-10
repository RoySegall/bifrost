class Container:

    services = {}

    def __init__(self):
        self.reset_services()

    def reset_services(self):
        """
        Starting the service container. The service container initialise process
        have a couple of steps:
            1. Send signal that the service container is starting.
            2. Collection definitions of references for services provided by the
                packages.
        :return:
        """
        pass

    def get_service(self, service_name):
        """
        Get a service from the container by name.

        :param service_name: The service name.

        :return: The service object.
        """
        pass

    def set_service(self, service_name, reference):
        """
        Set a service. You might want to use it when building the container
        manually in testing or when we need to swap services during tests.

        :param service_name: The service name.
        :param reference: The service reference.
        """
        pass
