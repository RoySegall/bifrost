from datetime import datetime
from django.test import Client
from bifrost.src.CommonTestUtils import BaseTestUtils
from bifrost.src.ioc.ServiceContainer import Container
from graphene_django.utils.testing import GraphQLTestCase
from bifrost.schema import schema
import json


class TestGraphQL(BaseTestUtils, GraphQLTestCase):

    GRAPHQL_SCHEMA = schema

    def setUp(self):
        super(BaseTestUtils, self).setUpClass()
        Container.reset_services()

        self.location = self.create_location()

        self.alice = self.create_user('Alice')
        self.bob = self.create_user('Bob')

        # Create the users.
        self.first_user = self.create_user('first_user')
        self.second_user = self.create_user('second_user')

        self.first_user_trip = self.prepare_trip(self.first_user)
        self.second_user_trip = self.prepare_trip(self.second_user)

    def prepare_trip(self, user):
        """"
        Preparing the trip for a given user: timeline, flight etc. etc.
        """

        timeline = self.create_timeline(user)

        picking_car = Container.picking_car_service().create(
            title=f'Dummy flight for user {user.username}',
            starting_date=datetime.now(),
            timeline=timeline,
            agency="Hertz",
            type="BMW",
            license_number="OutOfTime",
            location=self.location
        )

        connection_flight = Container.flight_service().create(
            title=f'Connection dummy flight {user.username}',
            starting_date=datetime.now(),
            timeline=timeline,
            origin='House of cats',
            destination='Another house of cats',
            extra_info='Keep calm',
            location=self.location
        )

        flight = Container.flight_service().create(
            title=f'Dummy flight {user.username}',
            starting_date=datetime.now(),
            timeline=timeline,
            origin='House of cats',
            destination='Another house of cats',
            extra_info='Keep calm',
            location=self.location,
            flight=connection_flight
        )

        meeting_conjunction = Container.meeting_conjunction_service().create(
            members=(self.alice, self.bob),
            title=f'Dummy flight {user.username}',
            starting_date=datetime.now(),
            timeline=timeline,
            location=self.location
        )

        accommodation = Container.accommodation_service().create(
            title=f'Dummy flight {user.username}',
            starting_date=datetime.now(),
            timeline=timeline,
            hotel_name='Special Diabetes hotel',
            room='213',
        )

        return {
            'timeline': timeline,
            'picking_car': picking_car,
            'flight': flight,
            'connection_flight': connection_flight,
            'meeting_conjunction': meeting_conjunction,
            'accommodation': accommodation,
        }

    def test_complete_trip_view(self):
        """
        Testing we can view the trip.
        """
        self._client = self.login('first_user')

        response = self.query(
            '''
            query {
                timelines {
                    id
                }
            }
            '''
        )

        content = json.loads(response.content)

        print(content)

    def _test_view_trip_by_allowed_users(self):
        """
        Testing a user can access it's own trip and not other user's trips.
        """
        pass
