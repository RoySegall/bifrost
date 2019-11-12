from django.dispatch import receiver
from bifrost.signals import init_service
from bifrost.src.ioc.ServiceContainer import Container
from bifrost_events.Services import Flight, Accommodation, \
    PickingCar, MeetingConjunction


@receiver(init_service)
def declare_services(sender, **kwargs):
    Container.set_service('flight_service', Flight.Service)
    Container.set_service('accommodation_service', Accommodation.Service)
    Container.set_service('picking_car_service', PickingCar.Service)
    Container.set_service(
        'meeting_conjunction_service', MeetingConjunction.Service
    )
