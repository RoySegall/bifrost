import React from 'react';
import {X, Car, Hotel, Plane, Friends} from '../../Fonts'
import {
  dateFormat,
  dateFormatOnlyHour,
  dateFormatWithHour
} from '../../Services/consts'
import * as moment from 'moment';

export default class Events extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: props['events'],
      activeEvent: null,
      borderColor: {
        accommodationSet: 'pink',
        flightSet: 'orange',
        meetingconjunctionSet: 'blue',
        pickingcarSet: 'green'
      },
    };
  }

  /**
   * Setting which event to display in the vent view. In case we already
   * clicked on the same event the selected event will be deselected.
   *
   * @param selectedEvent
   *  The event we clicked.
   */
  setEventView(selectedEvent) {
    if (this.state.activeEvent) {
      if (
        this.state.activeEvent['day'] === selectedEvent['day'] &&
        this.state.activeEvent['key'] === selectedEvent['key']
      ) {
        this.removeEventView();
        return;
      }
    }

    this.setState({activeEvent: selectedEvent})
  }

  /**
   * Setting the selected event to null which will remove the event view.
   */
  removeEventView() {
    this.setState({activeEvent: null})
  }

  /**
   * This will refactor the end date by given laws: if the end date is in the
   * same day as the starting date only the hours will be displayed. If the
   * end date is in another day then we will display the full date.
   *
   * @param startDate
   *  The starting date of the event.
   * @param endDate
   *  The ending date.
   * @returns {string}
   *  The end date by laws.
   */
  refactorEndDate(startDate, endDate) {
    const startingFrom = moment.unix(startDate).utc();
    const endingFromUnix = moment.unix(endDate).utc();

    if (endingFromUnix.diff(startingFrom, "days") > 0) {
      return endingFromUnix.format(dateFormatWithHour);
    }

    return endingFromUnix.format(dateFormatOnlyHour);
  }

  List(days) {
    return <div>
      <div>
        {
          Object.keys(days).map(day => {
            const events = days[day]['events'].map((event, key) => {
              return this.singleEvent(event, day, key);
            });

            return <>
              {this.dayHead(days[day]['label'])}
              {events}
            </>
          })
        }
      </div>
    </div>
  }

  EventView() {
    if (this.state.activeEvent === null) {
      return <></>;
    }

    const activeEvent = this.state.activeEvent;
    const event = this.state.events[activeEvent['day']]['events'][activeEvent['key']];

    const onClick = (event) => {
      event.preventDefault();
      this.removeEventView();
    };

    const rightBorder = `border-r-2 border-dashed border-${this.state.borderColor[event['type']]}-500`;

    return <div className={`bg-gray-1000 pl-2 ml-2 ${rightBorder}`}>

      <div className={"event-view-wrapper"}>

        <div className="flex flex-row justify-between ml-2 mr-3 mt-2">
          <span>
            <h3 className="text-3xl font-bold">{event['title']}</h3>
          </span>
          <span>
            <a className="text-2xl text-red-600"
               href="#"
               onClick={(event) => onClick(event)}>
              {X()}
            </a>
          </span>
        </div>

        <div className="flex flex-row flex-shrink-0 p-3">
          <img className="border-2 border-red-400 border-solid rounded-lg mt-2"
               src={process.env.PUBLIC_URL + '/mps.png'}/>
        </div>

        <div className="pb-3">
          <span>
              Location: <b>{event['location']['title']}</b>,
              at <b>{moment.unix(event['startingDate']).utc().format(dateFormat)}</b>,&nbsp;
          </span>

          <span>
              Starts at <b>{moment.unix(event['endingDate']).utc().format(dateFormatOnlyHour)}</b> and
              ends at: <b>{this.refactorEndDate(event['startingDate'], event['endingDate'])}</b>
          </span>
        </div>

        <p className="mr-2">
          Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the
          release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of
          Lorem Ipsum.
        </p>
      </div>
    </div>
  }

  dayHead(title) {
    return <>
      <h3 className="text-3xl m-0 m-auto pb-3 text-center">{title}</h3>
      <hr className="w-1/2 m-0 m-auto p-2 border-purple-400 border-t-2 border-dashed"/>
    </>
  }

  singleEvent(event, day, key) {
    const icons = {
      accommodationSet: Hotel(),
      flightSet: Plane(),
      meetingconjunctionSet: Friends(),
      pickingcarSet: Car(),
    };

    const icon = icons[event['type']];

    const onClick = (event, day, key) => {
      event.preventDefault();
      this.setEventView({day, key});
    };

    const leftBorder = `border-l-2 border-dashed border-${this.state.borderColor[event['type']]}-500`;
    let rightBorder = `border-r-2 border-dashed border-${this.state.borderColor[event['type']]}-500`;

    if (this.state.activeEvent !== null) {
      rightBorder = '';
    }

    return <>
      <div key={key} className={`${leftBorder} ${rightBorder} bg-gray-1000 p-2 mb-4`}>
        <div className="flex flex-row justify-between pl-2 pr-2">
          <span className={`text-2xl text-${this.state.borderColor[event['type']]}-500 font-bold`}>{icon}</span>
          <span>{moment.unix(event['startingDate']).utc().format(dateFormatOnlyHour)}</span>
        </div>

        <hr className="bg-orange-500 mt-2 mb-1"/>

        <div className="flex flex-row justify-between pt-3 pl-2 pr-2">
          <a href='#' className="font-bold text-lg" onClick={(event) => onClick(event, day, key)}>
            {event['title']}
          </a>
          <span className="text-lg">Ends at: {this.refactorEndDate(event['startingDate'], event['endingDate'])}</span>
        </div>

        <p className="pt-3 pl-2 pr-2">
          TBD
        </p>
      </div>
    </>
  }

  render() {
    const cols = this.state.activeEvent !== null ? 'grid-cols-2' : 'grid-cols-1';
    return <>
      <div className={"mt-6 grid " + cols}>
        {this.List(this.state.events)}
        {this.EventView()}
      </div>
    </>
  }
}
