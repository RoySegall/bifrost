import graphene
from graphene_django import DjangoObjectType

from bifrost_events.models import MeetingConjunction
from bifrost_timeline.models import Timeline as TimelineModel


class Timeline(DjangoObjectType):
    shared = graphene.Boolean(source='shared')

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

        user_timelines = TimelineModel.objects.filter(user=user.id).all()
        mcs = MeetingConjunction.objects.filter(members=info.context.user)
        shared_timelines = []
        for mc in mcs:
            shared_timelines.append(mc.timeline)

        # Get the timeline by the current user and the shared events.
        return list(user_timelines) + list(shared_timelines)

    def resolve_timeline(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        try:
            timeline = TimelineModel.objects.get(id=id)
        except TimelineModel.DoesNotExist:
            return None

        if timeline.user.id == user:
            # The timeline belongs to the user.
            return timeline

        if timeline.shared:
            # The timeline is shared with the user so the user can access to the
            # timeline.
            return timeline

        return None
