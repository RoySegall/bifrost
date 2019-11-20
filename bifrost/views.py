from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.generic import TemplateView
from django.conf import settings
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class HomeView(TemplateView):
    template_name = "home.html"

    def get(self, request, *args, **kwargs):

        if settings.DEBUG:
            # We in debug. Go to the app.
            return HttpResponseRedirect('http://localhost:3000')

        context = {
            'title': 'Welcome',
            'name': request.user.username
        }

        return render_to_response(self.template_name, context)


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
