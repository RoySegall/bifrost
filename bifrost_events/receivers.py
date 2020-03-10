from django.dispatch import receiver
from bifrost.signals import init_service
from bifrost.src.ioc.ServiceContainer import Container
from bifrost_events.Services import Events


@receiver(init_service)
def declare_services(sender, **kwargs):
    Container.set_service('event_service', Events.Service)
