from bifrost.src.CommonTestUtils import BaseTestUtils
from bifrost.src.ioc.ServiceContainer import Container


class TestGraphQL(BaseTestUtils):

    def setUp(self):
        Container.reset_services()

        # Create the users.
        self.first_user = self.create_user('first_user')
        self.second_user = self.create_user('second_user')

        self.first_user_trip = self.prepare_trip(self.first_user)
        self.second_user_trip = self.prepare_trip(self.first_user)

    def prepare_trip(self, user):
        """"
        Preparing the trip for a given user: timeline, flight etc. etc.
        """

        return {
            'user': user
        }

    def test_complete_trip_view(self):
        """
        Testing we can view the trip.
        """
        pass

    def test_view_trip_by_allowed_users(self):
        """
        Testing a user can access it's own trip and not other user's trips.
        """
        pass
