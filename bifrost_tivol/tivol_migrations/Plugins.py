from django.contrib.auth.hashers import make_password
from tivol.base_classes.plugins import PluginBase, ReferencePlugin
from dateparser import parse


class IsSuperUserPlugin(PluginBase):

    # todo: move to django tivol.
    def process(self, value, extra_info=None):
        return value == 'yes'


class PasswordPlugin(PluginBase):

    # todo: move to django tivol.
    def process(self, value, extra_info=None):
        return make_password(value)


class DateFormatPlugin(PluginBase):

    def process(self, value, extra_info=None):

        if not value:
            return

        date = parse(value)

        if extra_info and 'delta' in extra_info:
            date = date + extra_info['delta']

        return date


class BifrostReferencePlugin(ReferencePlugin):

    def process(self, value, extra_info=None, **kwargs):

        if not value:
            # todo: move to django tivol.
            return

        return super().process(value, extra_info)
