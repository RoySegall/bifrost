from os import getcwd, path
from tivol.base_classes.mappers import CsvMapper
from tivol.base_classes.plugins import ReferencePlugin
from tivol.base_classes.migration_handler_base import MigrationHandlerBase
from django.contrib.auth.models import User
from bifrost_events.models import Accommodation, Flight, PickingCar
from bifrost_location.models import Location
from bifrost_timeline.models import Timeline
from bifrost_tivol.tivol_migrations import Plugins
from datetime import timedelta


class MigrationBase(MigrationHandlerBase):

    def init_helper(self, model_name, file, model):
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
