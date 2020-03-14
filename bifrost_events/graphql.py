import graphene
from graphene_django import DjangoObjectType

from .models import Flight as FlightModel, \
    Accommodation as AccommodationModel, PickingCar as PickingCarModel, \
    MeetingConjunction as MeetingConjunctionModel, Lunch as LunchModel, \
    Meeting as MeetingModel, GeneralEvent as GeneralEventModel


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


class Meeting(DjangoObjectType):
    class Meta:
        model = MeetingModel


class GeneralEvent(DjangoObjectType):
    class Meta:
        model = GeneralEventModel


class BifrostEventsGraphql(graphene.ObjectType):
    flights = graphene.List(Flight, timeline=graphene.Int())
    flight = graphene.Field(Flight, id=graphene.Int())

    accommodations = graphene.List(Accommodation, timeline=graphene.Int())
    accommodation = graphene.Field(Accommodation, id=graphene.Int())

    picking_cars = graphene.List(PickingCar, timeline=graphene.Int())
    picking_car = graphene.Field(PickingCar, id=graphene.Int())

    meeting_conjunctions = graphene.List(MeetingConjunction, timeline=graphene.Int())
    meeting_conjunction = graphene.Field(MeetingConjunction, id=graphene.Int())

    lunches = graphene.List(Lunch, timeline=graphene.Int())
    lunch = graphene.Field(Lunch, id=graphene.Int())

    meetings = graphene.List(Meeting, timeline=graphene.Int())
    meeting = graphene.Field(Meeting, id=graphene.Int())

    general_events = graphene.List(GeneralEvent, timeline=graphene.Int())
    general_event = graphene.Field(GeneralEvent, id=graphene.Int())

    def resolve_flights(self, info, **kwargs):
        user = info.context.user

        return FlightModel.objects.filter_not_shared(user_id=user.id, timeline=kwargs['timeline'])

    def resolve_flight(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return FlightModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)

    def resolve_accomodations(self, info, **kwargs):
        user = info.context.user

        return AccommodationModel.objects.filter_not_shared(user_id=user.id, timeline=kwargs['timeline'])

    def resolve_accomodation(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return AccommodationModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)

    def resolve_picking_cars(self, info, **kwargs):
        user = info.context.user

        return PickingCarModel.objects.filter_not_shared(user_id=user.id, timeline=kwargs['timeline'])

    def resolve_picking_car(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return PickingCarModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)

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

    def resolve_lunches(self, info, **kwargs):
        user = info.context.user

        return LunchModel.objects.filter_not_shared(user_id=user.id, timeline=kwargs['timeline'])

    def resolve_lunch(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return LunchModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)

    def resolve_meetings(self, info, **kwargs):
        user = info.context.user

        return MeetingModel.objects.filter_not_shared(user_id=user.id, timeline=kwargs['timeline'])

    def resolve_meeting(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return MeetingModel.objects.filter(id=id).first()\
            .filter_not_shared(user_id=user.id)

    def resolve_general_events(self, info, **kwargs):
        user = info.context.user

        return GeneralEventModel.objects.filter_not_shared(user_id=user.id, timeline=kwargs['timeline'])

    def resolve_general_event(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return GeneralEventModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)
