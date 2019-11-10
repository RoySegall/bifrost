from django.apps import AppConfig


class BifrostEventsConfig(AppConfig):
    name = 'bifrost_events'

    def ready(self):
        from . import receivers
