from bifrost.src.ioc.Base import ServiceBase


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Meeting conjunction service',
            'description': 'Manage meeting conjunctions',
        }

    def create(self):
        pass
