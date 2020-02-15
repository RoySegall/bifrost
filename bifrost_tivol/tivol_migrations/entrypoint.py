from tivol.base_classes.entry_point import EntryPoint
from bifrost_tivol.tivol_migrations import Migrations


class BifrostEntryPoint(EntryPoint):

    def register_migrations(self):
        self.add_migration_handler(Migrations.UserMigration)
        self.add_migration_handler(Migrations.TimelineMigration)
        self.add_migration_handler(Migrations.LocationMigration)
        self.add_migration_handler(Migrations.AccommodationMigration)
        self.add_migration_handler(Migrations.FlightMigration)
        self.add_migration_handler(Migrations.PickingCarMigration)
        self.add_migration_handler(Migrations.MeetingConjunctionMigration)
