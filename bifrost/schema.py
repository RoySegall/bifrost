from graphene_django import DjangoObjectType
import graphene
from bifrost_timeline.models import Timeline as TimelineModel
from django.contrib.auth.models import User as UserModel
from bifrost_location.models import Location as LocationModel
from bifrost_events.models import Flight as FlightModel, \
    Accommodation as AccommodationModel, PickingCar as PickingCarModel, \
    MeetingConjunction as MeetingConjunctionModel


class Timeline(DjangoObjectType):
    class Meta:
        model = TimelineModel


class User(DjangoObjectType):
    class Meta:
        model = UserModel
        fields = ['username', 'id', 'email']


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


class Location(DjangoObjectType):
    class Meta:
        model = LocationModel


class Query(graphene.ObjectType):
    timelines = graphene.List(Timeline)
    timeline = graphene.Field(Timeline, id=graphene.Int())

    user = graphene.List(User)

    flights = graphene.List(Flight)
    flight = graphene.Field(Flight, id=graphene.Int())

    accommodations = graphene.List(Accommodation)
    accommodation = graphene.Field(Accommodation, id=graphene.Int())

    picking_cars = graphene.List(PickingCar)
    picking_car = graphene.Field(PickingCar, id=graphene.Int())

    meeting_conjunctions = graphene.List(MeetingConjunction)
    meeting_conjunction = graphene.Field(MeetingConjunction, id=graphene.Int())

    locations = graphene.List(Location)
    location = graphene.List(Location, id=graphene.Int())

    def resolve_timelines(self, info):
        user = info.context.user

        # Get the timeline by the current user.
        return TimelineModel.objects.filter(user=user.id).all()

    def resolve_timeline(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        # Get the timeline by the current user.
        return TimelineModel.objects.filter(user=user.id, id=id).first()

    def resolve_user(self, info):
        user = info.context.user

        return UserModel.objects.get(pk=user.id)

    def resolve_flights(self, info):
        user = info.context.user

        return FlightModel.objects.filter(timeline__user=user.id).all()

    def resolve_flight(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return FlightModel.objects.filter(timeline__user=user.id, id=id).first()

    def resolve_accomodations(self, info):
        user = info.context.user

        return AccommodationModel.objects.filter(timeline__user=user.id).all()

    def resolve_accomodation(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return AccommodationModel.objects.filter(timeline__user=user.id, id=id).first()

    def resolve_picking_cars(self, info):
        user = info.context.user

        return PickingCarModel.objects.filter(timeline__user=user.id).all()

    def resolve_picking_car(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return PickingCarModel.objects.filter(timeline__user=user.id, id=id).first()

    def resolve_meeting_cojnunctions(self, info):
        user = info.context.user

        return MeetingConjunctionModel.objects.filter(timeline__user=user.id).all()

    def resolve_meeting_cojnunction(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return MeetingConjunctionModel.objects.filter(timeline__user=user.id, id=id).first()

    def resolve_locations(self, info):
        user = info.context.user

        return LocationModel.objects.filter(timeline__user=user.id).all()

    def resolve_location(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return LocationModel.objects.filter(timeline__user=user.id, id=id).first()


schema = graphene.Schema(query=Query)
