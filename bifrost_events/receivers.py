from django.dispatch import receiver
from bifrost.signals import init_service
from bifrost.src.ioc.ServiceContainer import Container
from bifrost_events.Services.FlightService import FlightService


@receiver(init_service)
def send_mail_on_publish(sender, **kwargs):
    Container.set_service('flight_service', FlightService)

