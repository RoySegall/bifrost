from django.contrib import admin
from bifrost_events.models import Flight,\
    PickingCar, Accommodation, MeetingConjunction, Lunch, GeneralEvent, Meeting

admin.site.register(Flight)
admin.site.register(PickingCar)
admin.site.register(Accommodation)
admin.site.register(MeetingConjunction)
admin.site.register(Lunch)
admin.site.register(Meeting)
admin.site.register(GeneralEvent)
