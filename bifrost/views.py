from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.generic import TemplateView
from django.conf import settings


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
