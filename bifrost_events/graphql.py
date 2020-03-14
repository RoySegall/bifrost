from bifrost_events.schemas.accommdation import BifrostAccommodationGraphql
from bifrost_events.schemas.flight import BifrostFlightGraphql
from bifrost_events.schemas.general_event import BifrostGeneralEventGraphql
from bifrost_events.schemas.lunch import BifrostLunchGraphql
from bifrost_events.schemas.meeting import BifrostMeetingGraphql
from bifrost_events.schemas.meeting_conjunction import \
    BifrostMeetingConjunctionGraphql
from bifrost_events.schemas.picking_car import BifrostPickingCarGraphql


class BifrostEventsGraphql(
    BifrostAccommodationGraphql,
    BifrostFlightGraphql,
    BifrostPickingCarGraphql,
    BifrostLunchGraphql,
    BifrostMeetingGraphql,
    BifrostMeetingConjunctionGraphql,
    BifrostGeneralEventGraphql
):
    pass
