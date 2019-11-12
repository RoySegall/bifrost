from bifrost.src.ioc.Base import ServiceBase
from bifrost_events.models import MeetingConjunction


class Service(ServiceBase):

    def info(self):
        return {
            'name': 'Meeting conjunction service',
            'description': 'Manage meeting conjunctions',
        }

    def create(self, members, **kwargs):
        """
        Create the meeting conjunction object.

        :return:
        """
        meeting_conjunction = MeetingConjunction.objects.create(**kwargs)

        # Adding the members to the meeting conjunction.
        for member in members:
            meeting_conjunction.members.add(member)

        return meeting_conjunction
