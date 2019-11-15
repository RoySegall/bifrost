from django.contrib import admin
from bifrost_events.models import Flight,\
    PickingCar, Accommodation, MeetingConjunction

admin.site.register(Flight)
admin.site.register(PickingCar)
admin.site.register(Accommodation)
admin.site.register(MeetingConjunction)
