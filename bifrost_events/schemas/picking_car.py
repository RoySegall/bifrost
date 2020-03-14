import graphene
from graphene_django import DjangoObjectType
from bifrost_events.models import PickingCar as PickingCarModel


class PickingCar(DjangoObjectType):
    class Meta:
        model = PickingCarModel


class BifrostPickingCarGraphql(graphene.ObjectType):
    picking_cars = graphene.List(PickingCar, timeline=graphene.Int())
    picking_car = graphene.Field(PickingCar, id=graphene.Int())

    def resolve_picking_cars(self, info, **kwargs):
        user = info.context.user

        not_shared_kwargs = {
            'user_id': user.id
        }

        if 'timeline' in kwargs:
            not_shared_kwargs['timeline'] = kwargs['timeline']

        return PickingCarModel.objects.filter_not_shared(**not_shared_kwargs)

    def resolve_picking_car(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        return PickingCarModel.objects.filter(
            timeline__user=user.id, id=id
        ).first().filter_not_shared(user_id=user.id)
