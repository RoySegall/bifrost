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
    timeline = graphene.List(Timeline)
    user = graphene.List(User)
    flight = graphene.List(Flight)
    accommodation = graphene.List(Accommodation)
    picking_car = graphene.List(PickingCar)
    meeting_conjunction = graphene.List(MeetingConjunction)
    location = graphene.List(Location)

    def resolve_timeline(self, info):
        return TimelineModel.objects.all()

    def resolve_user(self, info):
        return UserModel.objects.all()

    def resolve_flight(self, info):
        return FlightModel.objects.all()

    def resolve_accomodation(self, info):
        return AccommodationModel.objects.all()

    def resolve_picking_car(self, info):
        return PickingCarModel.objects.all()

    def resolve_meeting_cojnunction(self, info):
        return MeetingConjunctionModel.objects.all()

    def resolve_location(self, info):
        return LocationModel.objects.all()


schema = graphene.Schema(query=Query)
