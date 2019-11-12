from bifrost.src.ioc.Base import ServiceBase
from bifrost_events.models import Accommodation


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Accommodation service',
            'description': 'Manage accommodations',
        }

    def create(self, **kwargs):
        """
        Creating accommodation record in the DB.

        :param kwargs: Arguments of the accommodation model.

        :return: The accommodation service.
        """
        return Accommodation.objects.create(**kwargs)
