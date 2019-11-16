from bifrost.src.CommonTestUtils import BaseTestUtils


class TestHomePage(BaseTestUtils):

    def setUp(self):
        self.user = self.create_user()

    def test_authentication_redirect(self):
        """
        Testing when an anonymous user access the front page it will redirect
        to the front page.
        """
        response = self.client.get('')
        self.assertEquals(response.status_code, 302)

        response = self.client.get('', follow=True)
        self.assertIn('Login', response.rendered_content)
        self.assertIn('Username', response.rendered_content)
        self.assertIn('Password', response.rendered_content)
        self.assertIn('Log me in!', response.rendered_content)

    def test_login(self):
        """
        Testing the login process.
        """

        data = {'username': self.user.username, 'password': 'dummy_password'}
        response = self.client.post('/auth/login/', data, follow=True)

        decoded = response.content.decode("utf-8")
        self.assertIn(f'Welcome, {self.user.username}', decoded)
