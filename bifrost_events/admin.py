from django.contrib import admin

# Register your models here.
from bifrost_events.models import Flight

admin.site.register(Flight)
