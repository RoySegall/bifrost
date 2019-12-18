import React from 'react';
import YesNo from '../YesNo';
import { PlaneUp, PlaneDown, Excahnge, Car, Hotel, Friends } from '../../Fonts';

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
                        <li className="list-inline-item starting-date">
                            {PlaneUp()} <b>{timeline.startingDate}</b> |
                        </li>
                        <li className="list-inline-item ending-date">
                            {PlaneDown()} <b>{timeline.endingDate}</b>
                        </li>
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

    // eslint-disable-next-line
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
        <li className="list-inline-item connection">
            {Excahnge()} Connection flight - {YesNo(hasConnectionFlight(timeline.flightSet))},
        </li>
        <li className="list-inline-item picking-car">
            {Car()} Picking car - {YesNo(hasPickingCarEvent(timeline.pickingcarSet))},
        </li>
        <li className="list-inline-item accommodation">
            {Hotel()} Accommodation - {YesNo(hasAccommodation(timeline.accommodationSet))},
        </li>
        <li className="list-inline-item meeting-members">
            {Friends()} Meeting other - {YesNo(hasMeetMembers(timeline.meetingconjunctionSet))}
        </li>
    </ul>
}

export default Timelines;
