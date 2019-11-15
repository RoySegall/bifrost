from datetime import datetime
from bifrost.schema import schema
from bifrost.src.ioc.ServiceContainer import Container
from graphene_django.utils.testing import GraphQLTestCase
from bifrost.src.CommonTestUtils import BaseTestUtils
import json


class TestGraphQL(BaseTestUtils, GraphQLTestCase):

    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.simple_setup()

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
            connection_flight=connection_flight
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

    def send_timelines_query(self):
        """
        Sending query for timeline.

        :return: The response from the server.
        """
        response = self.query(
            '''
            {
                timelines {
                    id
                    title,
                    flightSet {
                      id,
                      title,
                      location {
                        title,
                        id
                      },
                      connectionFlight {
                        id,
                        title
                      }
                    },
                    accommodationSet {
                      id,
                      title
                    },
                    pickingcarSet {
                      id,
                      title
                    },
                    meetingconjunctionSet {
                      id
                      members {
                        id
                        username
                      }
                    }
                    user {
                      id
                    }
                }
            }
            '''
        )

        return json.loads(response.content)['data']

    def assertResponseValue(self, response, user_trip):
        """
        Asserting the response we got from the query.

        :param response: The response we got.
        :param user_trip: The objects we set for the user's trip.

        :return:
        """
        self.assertEquals(len(response['timelines']), 1)

        # First, check the timeline values.
        timeline = response['timelines'][0]

        self.assertEquals(timeline['title'], user_trip['timeline'].title)
        self.assertEquals(int(timeline['id']), user_trip['timeline'].id)

        # Second check the flight and the connection.
        flight = timeline['flightSet']

        self.assertEquals(int(flight[0]['id']), user_trip['flight'].id)
        self.assertEquals(flight[0]['title'], user_trip['flight'].title)

        connection_flight = flight[0]['connectionFlight']
        self.assertEquals(
            int(connection_flight['id']),
            user_trip['connection_flight'].id
        )
        self.assertEquals(
            connection_flight['title'],
            user_trip['connection_flight'].title
        )

    def test_complete_trip_view(self):
        """
        Testing we can view the trip.
        """
        # First, check with anonymous.
        anonymous_query = self.send_timelines_query()

        self.assertEquals(anonymous_query, {'timelines': []})

        # Now, check with teh first user.
        self._client = self.login('first_user')
        response = self.send_timelines_query()

        self.assertResponseValue(response, self.first_user_trip)

        print(response)

    def _test_view_trip_by_allowed_users(self):
        """
        Testing a user can access it's own trip and not other user's trips.
        """
        pass
