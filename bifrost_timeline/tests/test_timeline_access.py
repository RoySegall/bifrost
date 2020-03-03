from bifrost.src.CommonTestUtils import BaseTestUtils


class TestTimelineAccess(BaseTestUtils):
    """
    Testing shared timeline and events..
    """

    def setUp(self):
        """
        Create three users: a, b and c.
        Create a timeline which belong to user A and shared with user B.
        """
        self.simple_setup()

    def test_access_to_not_exists_timeline(self):
        """
        """
        pass

    def test_user_access_to_its_own_timeline(self):
        """
        """
        pass

    def test_user_access_to_timeline_which_shared_with_him(self):
        """
        """
        pass

    def test_access_for_the_shared_timeline_with_user_c(self):
        """
        """
        pass
