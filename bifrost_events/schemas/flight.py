import graphene
from graphene_django import DjangoObjectType
from bifrost_events.models import Flight as FlightModel


class Flight(DjangoObjectType):
    class Meta:
        model = FlightModel


class BifrostFlightGraphql(graphene.ObjectType):
    flights = graphene.List(Flight, timeline=graphene.Int())
    flight = graphene.Field(Flight, id=graphene.Int())

    def resolve_flights(self, info, **kwargs):
        user = info.context.user

        not_shared_kwargs = {
            'user_id': user.id
        }

        if 'timeline' in kwargs:
            not_shared_kwargs['timeline'] = kwargs['timeline']

        return FlightModel.objects.filter_not_shared(**not_shared_kwargs)

    def resolve_flight(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return FlightModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)
