from os import getcwd, path
from tivol.base_classes.mappers import CsvMapper
from tivol.base_classes.plugins import ReferencePlugin
from tivol.base_classes.migration_handler_base import MigrationHandlerBase
from django.contrib.auth.models import User
from tivol.models import ContentMigrationStatus

from bifrost_events.models import Accommodation, Flight, PickingCar, \
    MeetingConjunction
from bifrost_location.models import Location
from bifrost_timeline.models import Timeline
from bifrost_tivol.tivol_migrations import Plugins
from datetime import timedelta


class MigrationBase(MigrationHandlerBase):

    def init_helper(self, model_name, file, model=None):
        self.id = model_name
        self.name = f'{model_name.capitalize()} migration'
        self.description = f'Migrating {model_name}s into the system'

        file_path = path.join(
            getcwd(),
            'bifrost_tivol',
            'tivol_migrations',
            'source_files',
            file
        )

        csv_mapper = CsvMapper()
        csv_mapper.set_destination_file(path=file_path)

        self.add_source_mapper(csv_mapper)
        self.set_model_target(model)


class UserMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper('user', 'users.csv', User)

        self.fields_plugins = {
            'password': [Plugins.PasswordPlugin],
            'is_staff': [Plugins.IsSuperUserPlugin],
            'is_superuser': [Plugins.IsSuperUserPlugin]
        }


class TimelineMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper('timeline', 'timelines.csv', Timeline)

        self.fields_plugins = {
            'starting_date': [Plugins.DateFormatPlugin],
            'ending_date': [
                {
                    'plugin': Plugins.DateFormatPlugin,
                    'extra_info': {'delta': timedelta(days=6)}
                }
            ],
            'user': [
                {'plugin': ReferencePlugin, 'extra_info': {'model': User}},
            ],
        }


class LocationMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper('location', 'locations.csv', Location)


class AccommodationMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper('accommodation', 'accommodations.csv', Accommodation)

        self.fields_plugins = {
            'starting_date': [Plugins.DateFormatPlugin],
            'ending_date': [
                {
                    'plugin': Plugins.DateFormatPlugin,
                    'extra_info': {'delta': timedelta(days=6)}
                }
            ],
            'timeline': [
                {'plugin': ReferencePlugin, 'extra_info': {'model': Timeline}}
            ],
            'location': [
                {'plugin': ReferencePlugin, 'extra_info': {'model': Location}}
            ],
        }


class FlightMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper('flight', 'flights.csv', Flight)

        self.fields_plugins = {
            'starting_date': [Plugins.DateFormatPlugin],
            'ending_date': [
                {
                    'plugin': Plugins.DateFormatPlugin,
                    'extra_info': {'delta': timedelta(days=6)}
                }
            ],
            'timeline': [
                {
                    'plugin': Plugins.BifrostReferencePlugin,
                    'extra_info': {'model': Timeline}
                }
            ],
            'location': [
                {'plugin': ReferencePlugin, 'extra_info': {'model': Location}}
            ],
            'connection_flight': [
                {
                    'plugin': Plugins.BifrostReferencePlugin,
                    'extra_info': {'model': Flight}
                }
            ],
        }


class PickingCarMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper('picking_car', 'picking_car.csv', PickingCar)

        self.fields_plugins = {
            'starting_date': [Plugins.DateFormatPlugin],
            'ending_date': [
                {
                    'plugin': Plugins.DateFormatPlugin,
                    'extra_info': {'delta': timedelta(days=6)}
                }
            ],
            'timeline': [
                {
                    'plugin': Plugins.BifrostReferencePlugin,
                    'extra_info': {'model': Timeline}
                }
            ],
            'location': [
                {'plugin': ReferencePlugin, 'extra_info': {'model': Location}}
            ],
        }


class MeetingConjunctionMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper(
            'meeting_conjunction',
            'meeting_conjunctions.csv',
            MeetingConjunction
        )

        self.fields_plugins = {
            'starting_date': [Plugins.DateFormatPlugin],
            'ending_date': [
                {
                    'plugin': Plugins.DateFormatPlugin,
                    'extra_info': {'delta': timedelta(days=6)}
                }
            ],
            'timeline': [
                {
                    'plugin': Plugins.BifrostReferencePlugin,
                    'extra_info': {'model': Timeline}
                }
            ],
            'location': [
                {'plugin': ReferencePlugin, 'extra_info': {'model': Location}}
            ],
        }


class MeetingConjunctionMembersMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper(
            'members_to_conjunctions',
            'members_to_conjunctions.csv',
        )

    def get_meeting_conjunction(self, event_ref):
        event_ref = ContentMigrationStatus.objects.get(source_id=event_ref)
        return MeetingConjunction.objects.get(id=event_ref.destination_id)

    def get_users(self, members):
        users_ids_queries = ContentMigrationStatus \
            .objects \
            .filter(source_id__in=members.split(',')) \
            .values_list('destination_id', flat=True)
        return User.objects.filter(id__in=users_ids_queries)

    def migrate(self):
        rows = self.source_mapper.process()
        for row in rows:
            meeting_conjunction = self.get_meeting_conjunction(row['event'])
            users = self.get_users(row['members'])
            for user in users:
                meeting_conjunction.members.add(user)
            meeting_conjunction.save()

        return f'{self.name}: {len(rows)} migrated'
