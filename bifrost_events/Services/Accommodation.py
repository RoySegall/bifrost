from bifrost.src.ioc.Base import ServiceBase


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Accommodation service',
            'description': 'Manage accommodations',
        }

    def create(self):
        pass
