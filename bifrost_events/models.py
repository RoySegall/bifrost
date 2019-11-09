from django.contrib.auth.models import User
from django.db import models
from bifrost_location.models import Location
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
    location = models.ForeignKey(
        Location,
        on_delete=models.DO_NOTHING,
        null=True
    )


class Flight(EventBase):
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    extra_info = models.TextField()
    connection_flight = models.ForeignKey(
        'Flight',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )


class Accommodation(EventBase):
    hotel_name = models.CharField(max_length=255)
    room = models.CharField(max_length=255)


class PickingCar(EventBase):
    agency = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    license_number = models.CharField(max_length=255)


class MeetingConjunction(EventBase):
    members = models.ManyToManyField(User)
