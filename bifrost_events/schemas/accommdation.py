import graphene
from graphene_django import DjangoObjectType
from bifrost_events.models import Accommodation as AccommodationModel


class Accommodation(DjangoObjectType):
    class Meta:
        model = AccommodationModel


class BifrostAccommodationGraphql(graphene.ObjectType):
    accommodations = graphene.List(Accommodation, timeline=graphene.Int())
    accommodation = graphene.Field(Accommodation, id=graphene.Int())

    def resolve_accomodations(self, info, **kwargs):
        user = info.context.user

        not_shared_kwargs = {
            'user_id': user.id
        }

        if 'timeline' in kwargs:
            not_shared_kwargs['timeline'] = kwargs['timeline']

        return AccommodationModel.objects\
            .filter_not_shared(**not_shared_kwargs)

    def resolve_accomodation(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return AccommodationModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)
