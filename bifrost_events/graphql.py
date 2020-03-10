import graphene
from graphene_django import DjangoObjectType
from .models import Flight as FlightModel, \
    Accommodation as AccommodationModel, PickingCar as PickingCarModel, \
    MeetingConjunction as MeetingConjunctionModel, Lunch as LunchModel


class Flight(DjangoObjectType):
    class Meta:
        model = FlightModel


class Accommodation(DjangoObjectType):
    class Meta:
        model = AccommodationModel


class PickingCar(DjangoObjectType):
    class Meta:
        model = PickingCarModel


class MeetingConjunction(DjangoObjectType):
    class Meta:
        model = MeetingConjunctionModel


class Lunch(DjangoObjectType):
    class Meta:
        model = LunchModel


class BifrostEventsGraphql(graphene.ObjectType):
    flights = graphene.List(Flight)
    flight = graphene.Field(Flight, id=graphene.Int())

    accommodations = graphene.List(Accommodation)
    accommodation = graphene.Field(Accommodation, id=graphene.Int())

    picking_cars = graphene.List(PickingCar)
    picking_car = graphene.Field(PickingCar, id=graphene.Int())

    meeting_conjunctions = graphene.List(MeetingConjunction)
    meeting_conjunction = graphene.Field(MeetingConjunction, id=graphene.Int())

    lunches = graphene.List(Lunch)
    lunch = graphene.Field(Lunch, id=graphene.Int())

    def resolve_flights(self, info):
        user = info.context.user

        return FlightModel.objects.filter(timeline__user=user.id).all()

    def resolve_flight(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return FlightModel.objects.filter(
            timeline__user=user.id, id=id
        ).first()

    def resolve_accomodations(self, info):
        user = info.context.user

        return AccommodationModel.objects.filter(timeline__user=user.id).all()

    def resolve_accomodation(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return AccommodationModel.objects.filter(
            timeline__user=user.id, id=id
        ).first()

    def resolve_picking_cars(self, info):
        user = info.context.user

        return PickingCarModel.objects.filter(timeline__user=user.id).all()

    def resolve_picking_car(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return PickingCarModel.objects.filter(
            timeline__user=user.id, id=id
        ).first()

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

    def resolve_lunches(self, info):
        user = info.context.user

        return LunchModel.objects.filter(
            timeline__user=user.id
        ).all()

    def resolve_lunch(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return LunchModel.objects.filter(
            timeline__user=user.id, id=id
        ).first()
