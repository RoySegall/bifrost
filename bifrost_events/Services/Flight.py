from bifrost.src.ioc.Base import ServiceBase


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Flight service',
            'description': 'Manage flights',
        }

    def create(self):
        pass
