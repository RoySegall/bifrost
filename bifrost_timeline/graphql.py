import graphene
from graphene_django import DjangoObjectType

from bifrost_events.models import MeetingConjunction
from bifrost_timeline.models import Timeline as TimelineModel


class Timeline(DjangoObjectType):
    class Meta:
        model = TimelineModel


class BifrostTimelineGrpahql(graphene.ObjectType):
    timelines = graphene.List(Timeline)
    timeline = graphene.Field(Timeline, id=graphene.Int())

    # Shared timeline is a timeline which shared with other users but only when
    # a meeting conjunction exists. The events in the timeline are shared
    # between the starting of the meeting conjunction and the end of the event.
    shared_timelines = graphene.List(Timeline)
    shared_timeline = graphene.List(Timeline)

    def resolve_timelines(self, info):
        user = info.context.user

        # Get the timeline by the current user.
        return TimelineModel.objects.filter(user=user.id).all()

    def resolve_timeline(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        # Get the timeline by the current user.
        return TimelineModel.objects.filter(user=user.id, id=id).first()

    def resolve_shared_timelines(self, info):
        # First, get the meeting conjunctions of the user.

        return [mc.timeline for mc in
                MeetingConjunction.objects.filter(members=info.context.user)]

    def resolve_shared_timeline(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        # Get the timeline by the current user.
        return TimelineModel.objects.filter(user=user.id, id=id).first()
