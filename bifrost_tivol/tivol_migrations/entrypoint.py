from tivol.base_classes.entry_point import EntryPoint
from bifrost_tivol.tivol_migrations.Migrations import BifrostUserMigration


class BifrostEntryPoint(EntryPoint):

    def register_migrations(self):
        self.add_migration_handler(BifrostUserMigration)

