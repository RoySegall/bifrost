from django.db.utils import IntegrityError
from bifrost.src.TestUtils.common_test_utils import BaseTestUtils


class TestLocation(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

    def test_create_location(self):
        """
        Testing the creation of the location.
        """

        location = self.create_location()

        self.assertIsNotNone(location)

        try:
            self.create_location()
            self.fail('There should be an SQL error but nothing happens.')
        except IntegrityError as e:
            pass
