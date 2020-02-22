import React from 'react';
import YesNo from '../YesNo';
import {PlaneUp, PlaneDown, Excahnge, Car, Hotel, Friends} from '../../Fonts';

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
    return <div key={key}>
      <section className="bg-orange-100 p-4 mt-4 border-orange-400 border m-0 m-auto">

        <div className="flex flex-row">
          <a href={"/timeline/" + timeline.id}
             className="text-3xl text-teal-500 hover:underline pb-2 timeline-link"
          >{timeline.title}</a>
        </div>

        <ul className="flex flex-row text-2xl">
          <li className="mr-2">
            <span className="text-blue-500">{PlaneUp()}</span> <b className="starting-date">{timeline.startingDate}</b> |
          </li>
          <li>
            <span className="text-orange-500">{PlaneDown()}</span> <b className="ending-date">{timeline.endingDate}</b>
          </li>
        </ul>

        <div className="flex flex-row pt-3 text-lg">
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
  return <ul className="flex justify-around">
    <li className="list-inline-item connection mr-2">
      {Excahnge()} Connection flight - {YesNo(hasConnectionFlight(timeline.flightSet))},
    </li>
    <li className="list-inline-item picking-car mr-2">
      {Car()} Picking car - {YesNo(hasPickingCarEvent(timeline.pickingcarSet))},
    </li>
    <li className="list-inline-item accommodation mr-2">
      {Hotel()} Accommodation - {YesNo(hasAccommodation(timeline.accommodationSet))},
    </li>
    <li className="list-inline-item meeting-members mr-2">
      {Friends()} Meeting other - {YesNo(hasMeetMembers(timeline.meetingconjunctionSet))}
    </li>
  </ul>
}

export default Timelines;
