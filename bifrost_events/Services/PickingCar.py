from bifrost.src.ioc.Base import ServiceBase


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Picking car service',
            'description': 'Manage picking cars events',
        }

    def create(self):
        pass
