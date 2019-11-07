from django.contrib.auth.models import User
from django.db import models
from bifrost_timeline.models import Timeline


class EventBase(models.Model):
    """
    Holds the base fields for each event model.
    """

    class Meta:
        abstract = True

    title = models.CharField(max_length=255)
    starting_date = models.DateTimeField()
    ending_date = models.DateTimeField(null=True, blank=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, null=True)
    # todo: add geolocation field.


class Flight(EventBase):
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    extra_info = models.TextField()
    connection_flight = models.ForeignKey('Flight', on_delete=models.CASCADE, null=True, blank=True)


class Accommodation(EventBase):
    hotel_name = models.CharField(max_length=255)
    room = models.CharField(max_length=255)


class PickingCar(EventBase):
    agency = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    license_number = models.CharField(max_length=255)


class MeetingConjunction(EventBase):
    members = models.CharField(max_length=255)
    type = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    location = models.CharField(max_length=255)
