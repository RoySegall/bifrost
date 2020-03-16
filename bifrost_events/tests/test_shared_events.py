from django.test import tag

from bifrost.src.CommonTestUtils import BaseTestUtils
from bifrost.src.ioc import ServiceContainer
from datetime import datetime, timedelta

from bifrost_events.models import event_between_conjunction


@tag('now')
class TestSharedEvents(BaseTestUtils):

    def setUp(self):
        self.simple_setup()

        # Creating users.
        self.host_user = self.create_user('host_user')
        self.guest_user = self.create_user('guest_user')

        # Create the timeline and for the host user and start to create
        # events.
        self.timeline = self.create_timeline(user=self.host_user)

        # Create events.
        location = self.create_location()
        time = datetime.now()
        events_service = ServiceContainer.Container.events_service()

        self.flight = events_service.create_flight_event(
            title='Dummy flight',
            starting_date=time,
            timeline=self.timeline,
            origin='House of cats',
            destination='Another house of cats',
            extra_info='Keep calm',
            location=location
        )

        self.general_event_in_range = events_service.create_general_event(
            title='Lunch',
            starting_date=time + timedelta(days=1, hours=1),
            timeline=self.timeline,
            location=location
        )

        create_meeting_conjunction_kwargs = {
            'members': [self.guest_user],
            'title': f'Dummy flight',
            'starting_date': time + timedelta(days=1),
            'ending_date': time + timedelta(days=3),
            'timeline': self.timeline,
            'location': location
        }
        self.meeting_conjunction = events_service\
            .create_meeting_conjunction(**create_meeting_conjunction_kwargs)

        self.general_event_out_of_range = events_service.create_general_event(
            title='Lunch',
            starting_date=time + timedelta(days=4, hours=1),
            timeline=self.timeline,
            location=location
        )

    def test_event_between_conjunction(self):
        """
        Testing the logic of event sharing from the basic function point of
        view.
        """

        # Checking that the events are not between conjunctions for the host
        # user since the host user is does not belong to any meeting
        # conjunction.
        self.assertFalse(
            event_between_conjunction(self.host_user, self.flight)
        )
        self.assertFalse(event_between_conjunction(
            self.host_user,
            self.general_event_in_range
        ))
        self.assertFalse(event_between_conjunction(
            self.host_user, self.general_event_out_of_range
        ))

        # Making sure the gust user only has access to the general event in
        # the range.
        self.assertFalse(
            event_between_conjunction(self.guest_user, self.flight)
        )
        self.assertTrue(event_between_conjunction(
            self.guest_user, self.general_event_in_range
        ))
        self.assertFalse(event_between_conjunction(
            self.guest_user, self.general_event_out_of_range
        ))

    def test_filter_not_shared(self):
        """
        Testing the logic of event sharing from the model point of view.
        """
        pass

    def test_events_sharing_filtering_via_grpahql(self):
        """
        Testing the logic of event sharing from the point of view of a GraphQL
        query.
        """
        pass
