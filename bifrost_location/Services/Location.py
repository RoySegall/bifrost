from bifrost.src.ioc.Base import ServiceBase
from bifrost_location.models import Location


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Location service',
            'description': 'Manage locations',
        }

    def create(self, **kwargs):
        """
        Creating location record in the DB.

        :param kwargs: Arguments of the accommodation model.

        :return: The accommodation service.
        """
        return Location.objects.create(**kwargs)
