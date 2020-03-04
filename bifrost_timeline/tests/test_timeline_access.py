from django.test import tag
from datetime import datetime
from graphene_django.utils import GraphQLTestCase
from bifrost.src.CommonTestUtils import BaseTestUtils
from bifrost_events.models import MeetingConjunction
import json
from bifrost.schema import schema


@tag('now')
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
        # Creating the users.
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

    def test_user_access_to_its_own_timeline(self):
        """
        """
        self._client = self.login('user_timeline')
        response = self.query(
            '''
            {
                timelines {
                    id
                }
            }
            '''
        )

        data = json.loads(response.content)['data']
        self.assertEqual(data, {'timelines': [{'id': str(self.timeline.id)}]})

    def test_user_access_to_timeline_which_shared_with_him(self):
        """
        """
        pass

    def test_access_for_the_shared_timeline_with_user_c(self):
        """
        """
        pass
