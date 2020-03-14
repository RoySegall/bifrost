import graphene
from graphene_django import DjangoObjectType
from bifrost_events.models import Meeting as MeetingModel


class Meeting(DjangoObjectType):
    class Meta:
        model = MeetingModel


class BifrostMeetingGraphql(graphene.ObjectType):
    meetings = graphene.List(Meeting, timeline=graphene.Int())
    meeting = graphene.Field(Meeting, id=graphene.Int())

    def resolve_meetings(self, info, **kwargs):
        user = info.context.user

        not_shared_kwargs = {
            'user_id': user.id
        }

        if 'timeline' in kwargs:
            not_shared_kwargs['timeline'] = kwargs['timeline']

        return MeetingModel.objects.filter_not_shared(**not_shared_kwargs)

    def resolve_meeting(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return MeetingModel.objects.filter(id=id).first() \
            .filter_not_shared(user_id=user.id)
