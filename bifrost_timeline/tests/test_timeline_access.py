from datetime import datetime
from graphene_django.utils import GraphQLTestCase
from bifrost.src.CommonTestUtils import BaseTestUtils
from bifrost_events.models import MeetingConjunction
import json
from bifrost.schema import schema


class TestTimelineAccess(BaseTestUtils, GraphQLTestCase):
    """
    Testing shared timeline and events..
    """

    GRAPHQL_SCHEMA = schema

    def setUp(self):
        """
        Create three users: a, b and c.
        Create a timeline which belong to user A and shared with user B while
        user C is not shared with any timeline.
        """

        self.simple_setup()

        self.user_timeline = self.create_user(username='user_timeline')
        self.user_shared_with = self.create_user(username='user_shared_with')
        self.user_not_shared = self.create_user(username='user_not_shared')

        # Create the timeline.
        self.timeline = self.create_timeline(user=self.user_timeline)

        # Create meeting conjunction with the user.
        self.mc = MeetingConjunction.objects.create(
            timeline=self.timeline, starting_date=datetime.now()
        )
        self.mc.members.add(self.user_shared_with)
        self.mc.save()

    def get_timelines(self):
        """
        Get all the timelines.
        """
        response = self.query(
            '''
            {
                timelines {
                    id
                }
            }
            '''
        )

        return json.loads(response.content)['data']

    def get_timeline(self, timeline_id):
        """
        Get a single timeline.
        """
        response = self.query(
            '''
            {
                timeline(id: ''' + timeline_id + ''') {
                    id
                }
            }
            '''
        )
        return response.json()['data']

    def test_user_access_to_its_own_timeline(self):
        """
        Testing access to the user own timeline.
        """
        self._client = self.login('user_timeline')
        data = self.get_timelines()
        self.assertEqual(data, {'timelines': [{'id': str(self.timeline.id)}]})

        data = self.get_timeline(str(self.timeline.id))
        self.assertEqual(data, {'timeline': {'id': str(self.timeline.id)}})

    def test_user_access_to_timeline_which_shared_with_him(self):
        """
        Testing the access for timelines which shared with the user.
        """
        self._client = self.login('user_shared_with')
        data = self.get_timelines()
        self.assertEqual(data, {'timelines': [{'id': str(self.timeline.id)}]})

        data = self.get_timeline(str(self.timeline.id))
        self.assertEqual(data, {'timeline': {'id': str(self.timeline.id)}})

        # Create another timeline for the "user_shared_with".
        self.create_timeline(self.user_shared_with)
        data = self.get_timelines()
        self.assertEqual(2, len(data['timelines']))

        # Login as the first user and make sure the user can see a single
        # timeline.
        self._client = self.login('user_timeline')
        data = self.get_timelines()
        self.assertEqual(1, len(data['timelines']))

    def test_access_for_the_shared_timeline_with_user_c(self):
        """
        Check that a user which not shared with will not see any timeline.
        """
        self.login(self.user_not_shared)
        data = self.get_timelines()
        self.assertEqual(0, len(data['timelines']))

        data = self.get_timeline(str(self.timeline.id))
        self.assertEqual(data, {'timeline': None})

    def test_access_as_anonymous(self):
        data = self.get_timelines()
        self.assertEqual(0, len(data['timelines']))

        data = self.get_timeline(str(self.timeline.id))
        self.assertEqual(data, {'timeline': None})
