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
    ending_date = models.DateTimeField()
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, null=True)
    # todo: add geolocation field.


class Flight(EventBase):
    origin = models.CharField(max_length=255)
    destination = models.SlugField(unique=True)
    extra_info = models.TextField()
    connection_flight = models.ForeignKey('Flight', on_delete=models.CASCADE, null=True, blank=True)
