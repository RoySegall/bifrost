from django.dispatch import receiver
from bifrost.signals import init_service
from bifrost.src.ioc.ServiceContainer import Container
from bifrost_location.Services import Location


@receiver(init_service)
def declare_services(sender, **kwargs):
    Container.set_service('location_service', Location.Service)
