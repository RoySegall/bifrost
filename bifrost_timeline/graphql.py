import graphene
from graphene_django import DjangoObjectType
from bifrost_timeline.models import Timeline as TimelineModel
from bifrost.src.ioc.ServiceContainer import Container


class Timeline(DjangoObjectType):
    shared = graphene.Boolean(source='shared')

    class Meta:
        model = TimelineModel


class BifrostTimelineGrpahql(graphene.ObjectType):
    timelines = graphene.List(Timeline)
    timeline = graphene.Field(Timeline, id=graphene.Int())

    def resolve_timelines(self, info):
        user = info.context.user

        user_timelines = TimelineModel.objects.filter(user=user.id).all()

        shared_timelines = Container\
            .timeline_service()\
            .get_shared_timelines(info.context.user)

        # Get the timeline by the current user and the shared events.
        return list(user_timelines) + list(shared_timelines)

    def resolve_timeline(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        try:
            timeline = TimelineModel.objects.filter(id=id).first()
        except TimelineModel.DoesNotExist:
            return None

        if timeline.user.id == user.id:
            # The timeline belongs to the user.
            return timeline

        if Container.timeline_service().is_shared_timeline(info.context.user,
                                                           timeline):
            return timeline

        return None
