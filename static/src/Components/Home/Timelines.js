import React from 'react';
import YesNo from '../YesNo'

/**
 * Generating a single entry in the timeline.
 *
 * @param data
 *  List of timelines.
 * @returns
 *  The list of timelines.
 *
 * @constructor
 */
function Timelines(data) {
    const {timelines} = data;

    return timelines.map((timeline, key) => {
        return <div className="row" key={key}>
            <section className="timeline-wrapper">
                <div className="col-12">
                    <a href={"/timeline/" + timeline.id} className="timeline-link">{timeline.title}</a>
                </div>

                <div className="col-12">
                    <ul className="list-inline">
                        <li className="list-inline-item"><i className="fal fa-plane-departure"></i> <b>{timeline.startingDate}</b> | </li>
                        <li className="list-inline-item"><i className="fal fa-plane-arrival"></i> <b>{timeline.endingDate}</b></li>
                    </ul>
                </div>

                <div className="col-12 extra-info">
                    <span className="title">Extra info:</span>
                    {extraInfo(timeline)}
                </div>
            </section>
        </div>
    });
}

/**
 * Checking if the employee has any connection flight.
 *
 * @param flights
 *  List of flights.
 */
const hasConnectionFlight = (flights) => {
    let connectionFlightExists = false;

    flights.map(flight => {
        // The first flight has a connection flight. That's enough for us.
        if (flight.connectionFlight !== undefined) {
            connectionFlightExists = true;
            return false;
        }
    });

    return connectionFlightExists;
};

/**
 * Checking if the employee need to pick a rental car.
 *
 * @param pickingCar
 *  List of picking car events.
 */
const hasPickingCarEvent = (pickingCar) => {
    return pickingCar.length;
};

/**
 * Checking if the employee has accommodation.
 * @param accommodation
 *  The accommodation list.
 */
const hasAccommodation = (accommodation) => {
    return accommodation.length;
};

/**
 * Check if the employee need to meet other employees during his trip.
 *
 * @param meeting
 *  List meeting events.
 */
const hasMeetMembers = (meeting) => {
    return meeting.length;
};


/**
 * Generating the extra data of a timeline.
 *
 * @param timeline
 *  The timeline object.
 *
 * @returns {*}
 *  Generated extra info.
 */
function extraInfo(timeline) {
    return <ul className="list-inline">
        <li className="list-inline-item"><i className="fal fa-exchange"></i> Connection flight - {YesNo(hasConnectionFlight(timeline.flightSet))},</li>
        <li className="list-inline-item"><i className="fal fa-car"></i> Picking car - {YesNo(hasPickingCarEvent(timeline.pickingcarSet))},</li>
        <li className="list-inline-item"><i className="fal fa-hotel"></i> Accommodation - {YesNo(hasAccommodation(timeline.accommodationSet))},</li>
        <li className="list-inline-item"><i className="fal fa-user-friends"></i> Meeting other - {YesNo(hasMeetMembers(timeline.meetingconjunctionSet))}</li>
    </ul>
}

export default Timelines;
