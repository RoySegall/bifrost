from django.http import HttpResponseRedirect, JsonResponse
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from bifrost.settings import FRONT_ADDRESS
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.views.generic.base import View


class HomeView(View):
    template_name = "home.html"

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(FRONT_ADDRESS)


class Login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        """
        Return a list of all users.
        """
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})

        if not serializer.is_valid(raise_exception=False):
            return Response({'error': 'Some of the details are not correct'},
                            status=400)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key
        })


@permission_classes([IsAuthenticated])
class Logout(APIView):

    def get(self, request, format=None):
        """
        Logging out of the system.
        """
        return JsonResponse({'foo': 'bar'})
