from django.apps import AppConfig


class BifrostLocationConfig(AppConfig):
    name = 'bifrost_location'

    def ready(self):
        from . import receivers
