import graphene
from graphene_django import DjangoObjectType
from bifrost_events.models import Lunch as LunchModel


class Lunch(DjangoObjectType):
    class Meta:
        model = LunchModel


class BifrostLunchGraphql(graphene.ObjectType):
    lunches = graphene.List(Lunch, timeline=graphene.Int())
    lunch = graphene.Field(Lunch, id=graphene.Int())

    def resolve_lunches(self, info, **kwargs):
        user = info.context.user

        not_shared_kwargs = {
            'user_id': user.id
        }

        if 'timeline' in kwargs:
            not_shared_kwargs['timeline'] = kwargs['timeline']

        return LunchModel.objects.filter_not_shared(**not_shared_kwargs)

    def resolve_lunch(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return LunchModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)
