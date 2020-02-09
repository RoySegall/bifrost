from tivol.base_classes.mappers import CsvMapper
from tivol.base_classes.migration_handler_base import MigrationHandlerBase
from os import getcwd, path
from django.contrib.auth.models import User

from bifrost_tivol.tivol_migrations.plugins import IsSuperUser


class BifrostUserMigration(MigrationHandlerBase):

    def init_metadata(self):
        self.id = 'user'
        self.name = 'User migration'
        self.description = 'Migrating users into the system'

        file_path = path.join(
            getcwd(),
            'bifrost_tivol',
            'tivol_migrations',
            'source_files',
            'users.csv'
        )

        csv_mapper = CsvMapper()
        csv_mapper.set_destination_file(path=file_path)

        self.add_source_mapper(csv_mapper)
        self.set_model_target(User)

        self.fields_plugins = {
            'is_staff': [IsSuperUser],
            'is_superuser': [IsSuperUser]
        }
