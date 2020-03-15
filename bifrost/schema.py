import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth.models import User as UserModel
from bifrost_events.graphql import BifrostEventsGraphql
from bifrost_location.graphql import BifrostLocationGraphql
from bifrost_timeline.graphql import BifrostTimelineGrpahql


class User(DjangoObjectType):
    class Meta:
        model = UserModel
        fields = ['username', 'id', 'email']


class Query(
    BifrostEventsGraphql,
    BifrostTimelineGrpahql,
    BifrostLocationGraphql,
):

    user = graphene.List(User)

    def resolve_user(self, info):
        user = info.context.user

        return UserModel.objects.get(pk=user.id)


schema = graphene.Schema(query=Query)
