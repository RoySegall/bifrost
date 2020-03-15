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

    def filter_not_shared(self, user_id):
        if event_between_conjunction(user_id, self):
            return self

        return None


class EventsManager(models.Manager):

    def filter_not_shared(self, user_id, timeline=None):
        events = self.all()

        filtered_events = []
        for event in events:

            if timeline and event.timeline.id != timeline:
                continue

            if event.timeline.user_id == user_id or \
                    event_between_conjunction(user_id, event):
                # This is the event which owned by the users. Append it.
                filtered_events.append(event)

        return filtered_events


def event_between_conjunction(user_id, event: EventBase):
    # Get the meeting conjunction which the user has in the current
    # timeline of the event.
    event_meeting_conjunction = MeetingConjunction.objects \
        .filter(members__in=[user_id], timeline=event.timeline).first()

    if not event_meeting_conjunction:
        return False

    mce = event_meeting_conjunction

    return mce.starting_date <= event.starting_date <= mce.ending_date


class Flight(EventBase):
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    extra_info = models.TextField(null=True, blank=True)
    timeline = models.ForeignKey(
        Timeline,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    connection_flight = models.ForeignKey(
        'Flight',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    objects = EventsManager()


class Accommodation(EventBase):
    hotel_name = models.CharField(max_length=255)
    room = models.CharField(max_length=255)
    objects = EventsManager()


class PickingCar(EventBase):
    agency = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    license_number = models.CharField(max_length=255)
    objects = EventsManager()


class MeetingConjunction(EventBase):
    members = models.ManyToManyField(User, blank=True)


class Lunch(EventBase):
    # todo: add support for contacts.
    objects = EventsManager()


class Meeting(EventBase):
    # todo: add support for contacts.
    objects = EventsManager()


class GeneralEvent(EventBase):
    objects = EventsManager()
