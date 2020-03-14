import graphene
from graphene_django import DjangoObjectType
from bifrost_events.models import GeneralEvent as GeneralEventModel


class GeneralEvent(DjangoObjectType):
    class Meta:
        model = GeneralEventModel


class BifrostGeneralEventGraphql(graphene.ObjectType):
    general_events = graphene.List(GeneralEvent, timeline=graphene.Int())
    general_event = graphene.Field(GeneralEvent, id=graphene.Int())

    def resolve_general_events(self, info, **kwargs):
        user = info.context.user

        not_shared_kwargs = {
            'user_id': user.id
        }

        if 'timeline' in kwargs:
            not_shared_kwargs['timeline'] = kwargs['timeline']

        return GeneralEventModel.objects.filter_not_shared(**not_shared_kwargs)

    def resolve_general_event(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return GeneralEventModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)
