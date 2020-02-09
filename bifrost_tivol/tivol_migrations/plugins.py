from tivol.base_classes.plugins import PluginBase


class IsSuperUser(PluginBase):

    def process(self, value, extra_info=None):
        return value == 'yes'
