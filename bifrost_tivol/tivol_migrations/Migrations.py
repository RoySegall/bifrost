from tivol.base_classes.mappers import CsvMapper
from tivol.base_classes.migration_handler_base import MigrationHandlerBase
from os import getcwd, path
from django.contrib.auth.models import User

from bifrost_timeline.models import Timeline
from bifrost_tivol.tivol_migrations.Plugins import IsSuperUserPlugin, \
    PasswordPlugin


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
            'password': [PasswordPlugin],
            'is_staff': [IsSuperUserPlugin],
            'is_superuser': [IsSuperUserPlugin]
        }


class TimelineMigration(MigrationBase):

    def init_metadata(self):
        self.init_helper('timeline', 'timelines.csv', Timeline)
