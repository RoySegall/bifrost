from bifrost.src.CommonTestUtils import BaseTestUtils


class TestCreateTimeline(BaseTestUtils):
    """
    Testing the timeline model.
    """

    def setUp(self):
        self.simple_setup()

    def test_user_timeline_relationship(self):
        """
        Testing the timeline and the user relationship works.

        todo: move logic to service and test that one.
        """
        self.assertEquals(self.user.timeline_set.first(), self.timeline)
