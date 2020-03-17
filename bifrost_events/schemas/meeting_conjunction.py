import graphene
from graphene_django import DjangoObjectType
from bifrost_events.models import MeetingConjunction as MeetingConjunctionModel


class MeetingConjunction(DjangoObjectType):
    class Meta:
        model = MeetingConjunctionModel


class BifrostMeetingConjunctionGraphql(graphene.ObjectType):
    meeting_conjunctions = graphene.List(
        MeetingConjunction,
        timeline=graphene.Int()
    )
    meeting_conjunction = graphene.Field(MeetingConjunction, id=graphene.Int())

    def resolve_meeting_cojnunctions(self, info):
        user = info.context.user

        return MeetingConjunctionModel.objects.filter(
            timeline__user=user.id
        ).all()

    def resolve_meeting_cojnunction(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return MeetingConjunctionModel.objects.filter(
            timeline__user=user.id, id=id
        ).first()
