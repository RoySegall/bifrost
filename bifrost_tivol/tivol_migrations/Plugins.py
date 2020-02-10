from django.contrib.auth.hashers import make_password
from tivol.base_classes.plugins import PluginBase


class IsSuperUserPlugin(PluginBase):

    def process(self, value, extra_info=None):
        return value == 'yes'


class PasswordPlugin(PluginBase):

    def process(self, value, extra_info=None):
        return make_password(value)
