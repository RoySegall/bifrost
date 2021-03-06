from datetime import datetime
from bifrost.schema import schema
from bifrost.src.ioc.ServiceContainer import Container
from graphene_django.utils.testing import GraphQLTestCase
from bifrost.src.CommonTestUtils import BaseTestUtils
import json


class TestGraphQL(BaseTestUtils, GraphQLTestCase):
    """
    Testing GraphQL integration.
    """

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

        picking_car = Container.events_service().create_picking_car(
            title=f'Dummy flight for user {user.username}',
            starting_date=datetime.now(),
            timeline=timeline,
            agency="Hertz",
            type="BMW",
            license_number="OutOfTime",
            location=self.location
        )

        connection_flight = Container.events_service().create_flight_event(
            title=f'Connection dummy flight {user.username}',
            starting_date=datetime.now(),
            origin='House of cats',
            destination='Another house of cats',
            extra_info='Keep calm',
            location=self.location
        )

        flight = Container.events_service().create_flight_event(
            title=f'Dummy flight {user.username}',
            starting_date=datetime.now(),
            timeline=timeline,
            origin='House of cats',
            destination='Another house of cats',
            extra_info='Keep calm',
            location=self.location,
            connection_flight=connection_flight
        )

        create_meeting_conjunction_kwargs = {
            'members': (self.alice, self.bob),
            'title': f'Dummy flight {user.username}',
            'starting_date': datetime.now(),
            'timeline': timeline,
            'location': self.location
        }
        meeting_conjunction = Container.events_service()\
            .create_meeting_conjunction(**create_meeting_conjunction_kwargs)

        accommodation = Container.events_service().create_accommodation(
            title=f'Dummy flight {user.username}',
            starting_date=datetime.now(),
            timeline=timeline,
            hotel_name='Special Diabetes hotel',
            room='213',
        )

        lunch = Container.events_service().create_lunch(
            title='Lunch',
            starting_date=datetime.now(),
            timeline=timeline,
            location=self.location
        )

        meeting = Container.events_service().create_meeting(
            title='Lunch',
            starting_date=datetime.now(),
            timeline=timeline,
            location=self.location
        )

        general_event = Container.events_service().create_general_event(
            title='Lunch',
            starting_date=datetime.now(),
            timeline=timeline,
            location=self.location
        )

        return {
            'timeline': timeline,
            'picking_car': picking_car,
            'flight': flight,
            'connection_flight': connection_flight,
            'meeting_conjunction': meeting_conjunction,
            'accommodation': accommodation,
            'lunch': lunch,
            'meeting': meeting,
            'general_event': general_event,
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
                    },
                    lunchSet {
                      id
                    },
                    meetingSet {
                      id
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
        """
        self.assertEquals(len(response['timelines']), 1)

        # Check the timeline.
        timeline = response['timelines'][0]

        self.assertEquals(timeline['title'], user_trip['timeline'].title)
        self.assertEquals(int(timeline['id']), user_trip['timeline'].id)

        # Check the flight and the connection.
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

        # Check accommodations.
        accommodation = timeline['accommodationSet']
        self.assertEquals(
            int(accommodation[0]['id']),
            user_trip['accommodation'].id
        )
        self.assertEquals(
            accommodation[0]['title'],
            user_trip['accommodation'].title
        )

        # Check meeting conjunction.
        meeting_conjunction = timeline['meetingconjunctionSet']
        self.assertEquals(
            int(meeting_conjunction[0]['id']),
            user_trip['meeting_conjunction'].id
        )

        # Check lunch.
        lunch = timeline['lunchSet']
        self.assertEquals(
            int(lunch[0]['id']),
            user_trip['lunch'].id
        )

        # Check meeting.
        lunch = timeline['meetingSet']
        self.assertEquals(
            int(lunch[0]['id']),
            user_trip['meeting'].id
        )

        members = meeting_conjunction[0]['members']
        alice = {'id': str(self.alice.id), 'username': self.alice.username}
        bob = {'id': str(self.bob.id), 'username': self.bob.username}
        self.assertTrue(alice in members)
        self.assertTrue(bob in members)

    def test_anonymous_trip_view(self):
        """
        Testing anonymous user trip view.
        """
        anonymous_query = self.send_timelines_query()
        self.assertEquals(anonymous_query, {'timelines': []})

    def test_view_for_two_different_users(self):
        """
        Testing that each user get the trip he owns.
        """
        self._client = self.login('first_user')
        response = self.send_timelines_query()
        self.assertResponseValue(response, self.first_user_trip)

        # Now, check the second user
        self._client = self.login('second_user')
        response = self.send_timelines_query()
        self.assertResponseValue(response, self.second_user_trip)
