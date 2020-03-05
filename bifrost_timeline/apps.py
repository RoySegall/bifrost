from django.apps import AppConfig


class BifrostTimelineConfig(AppConfig):
    name = 'bifrost_timeline'

    def ready(self):
        from . import receivers
