from rest_framework.authtoken.models import Token
from django.utils.deprecation import MiddlewareMixin


class BiforstAuth(MiddlewareMixin):

    def process_request(self, request):

        if 'Authorization' in list(request.headers):
            # Loading the token and setting the user object on the request.
            token = request.headers['Authorization'].replace('Token ', '')
            token = Token.objects.get(key=token)
            request.user = token.user
