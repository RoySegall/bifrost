import graphene
from graphene_django import DjangoObjectType
from bifrost_timeline.models import Timeline as TimelineModel


class Timeline(DjangoObjectType):

    class Meta:
        model = TimelineModel


class BifrostTimelineGrpahql(graphene.ObjectType):

    timelines = graphene.List(Timeline)
    timeline = graphene.Field(Timeline, id=graphene.Int())

    def resolve_timelines(self, info):
        user = info.context.user

        # Get the timeline by the current user.
        return TimelineModel.objects.filter(user=user.id).all()

    def resolve_timeline(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        # Get the timeline by the current user.
        return TimelineModel.objects.filter(user=user.id, id=id).first()
