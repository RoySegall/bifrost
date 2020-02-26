from django.contrib.auth.models import User
from django.test.testcases import TestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework import status


class TestLogout(TestCase):

    def setUp(self):
        """
        Setting up stuff for the tests. Maybe...
        """
        self.user = User.objects.create(email='foo@gmail.com')

    def create_access_token(self):
        """
        Creating an access token for a user.
        """
        token, created = Token.objects.get_or_create(user=self.user)
        return token

    def get_client(self, token=None):
        client = APIClient()

        if token:
            client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        return client

    def get_user(self, token):
        """
        Getting the uer object by a token object.
        """
        return self.get_client(token.key).get("/auth/user").json()

    def test_logout_with_non_existing_access_token(self):
        """
        Testing when trying to logout with a token which is not exists.
        """
        # Fire a logout command. Our token will be a pizza 🤘!
        res = self.get_client("pizza").delete("/auth/logout")

        self.assertEqual(res.json(), {'detail': 'Invalid token.'})
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_with_invalid_access_token(self):
        pass

    def test_logout_with_valid_access_token(self):
        # Make sure we got the correct user.
        token = self.create_access_token()
        self.assertEquals(self.get_user(token)['id'], self.user.id)

        # Now, let's logout and make sure the user's token is no longer valid.

    def test_logout_with_token_of_anoher_user(self):
        pass
