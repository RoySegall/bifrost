from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from bifrost.src.CommonTestUtils import BaseTestUtils


class TestHomePage(BaseTestUtils):

    def setUp(self):
        self.user = self.create_user()

    def test_authentication_redirect(self):
        """
        Testing the we redirect the user to the front app.
        """
        response = self.client.get('')
        self.assertEquals(response.status_code, 302)

    def test_login(self):
        """
        Testing the login process.
        """

        data = {'username': self.user.username, 'password': 'dummy_password'}

        client = APIClient()
        response = client.post('/auth/login', data, follow=True)

        token = Token.objects.get(user=self.user.id)

        self.assertEquals(token.key, response.json()['token'])
