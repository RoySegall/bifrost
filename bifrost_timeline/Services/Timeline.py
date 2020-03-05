from bifrost.src.ioc.Base import ServiceBase
from bifrost_events.models import MeetingConjunction


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Timeline service',
            'description': 'Manage locations',
        }

    def get_shared_timelines(self, user):
        """
        Get all the shared timelines of the user.
        """
        if user.is_anonymous:
            members = None
        else:
            members = user

        mcs = MeetingConjunction.objects.filter(members=members)
        shared_timelines = []
        for mc in mcs:
            shared_timelines.append(mc.timeline)

        return shared_timelines

    def is_shared_timeline(self, user, timeline):
        """
        Check if the user has an access to a given timeline.
        """
        return timeline in self.get_shared_timelines(user)
