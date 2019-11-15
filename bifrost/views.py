from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.generic import TemplateView
from django.urls import reverse


class HomeView(TemplateView):
    template_name = "home.html"

    def get(self, request, *args, **kwargs):

        if request.user.is_anonymous:
            # Anonymous user, redirect to login.
            return HttpResponseRedirect(reverse('login'))

        context = {
            'title': 'Welcome',
            'name': request.user.username
        }

        return render_to_response(self.template_name, context)
