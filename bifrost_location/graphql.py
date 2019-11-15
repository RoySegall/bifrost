import graphene
from graphene_django import DjangoObjectType
from .models import Location as LocationModel


class Location(DjangoObjectType):
    class Meta:
        model = LocationModel


class BifrostLocationGraphql(graphene.ObjectType):

    locations = graphene.List(Location)
    location = graphene.List(Location, id=graphene.Int())

    def resolve_locations(self, info):
        user = info.context.user

        return LocationModel.objects.filter(timeline__user=user.id).all()

    def resolve_location(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return LocationModel.objects.filter(
            timeline__user=user.id, id=id
        ).first()
