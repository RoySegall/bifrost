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

    eventHead(event) {

        const icons = {
            accommodationSet: Hotel(),
            flightSet: Plane(),
            meetingconjunctionSet: Friends(),
            pickingcarSet: Car(),
        };

        const icon = icons[event['type']];

        return <div >
            <div className="row head">
                <div >{icon}</div>
                <div className="col-6 text-right">{moment.unix(event['startingDate']).utc().format(dateFormatOnlyHour)}</div>
                <hr/>
            </div>
        </div>
    }

    eventBody(event, day, key) {
        const onClick = (event, day, key) => {
            event.preventDefault();
            this.setEventView({day, key});
        };

        return <div >
            <div className="row body">
                <div >
                    <a href='#' className={"title event-" + event['type'] + "-id-" + event['id']} onClick={(event) => onClick(event, day, key)}>
                        {event['title']}
                    </a>
                </div>

                <div className="col-6 text-right">
                    Ends at: {this.refactorEndDate(event['startingDate'], event['endingDate'])}
                </div>

                <div >
                    <p>TBDs</p>
                </div>
            </div>
        </div>
    }

    List(days) {
        const col = this.state.activeEvent === null ? 'col-12 full-event' : 'col-6';
        return <div className={"slow-transition " + col}>
            <div >
                {
                    Object.keys(days).map(day => {
                        const events = days[day]['events'].map((event, key) => {
                            return <div key={event['id'] + "-" + event['type']} className={"row event " + event['type']}>
                                {this.eventHead(event)}
                                {this.eventBody(event, day, key)}
                            </div>
                        });

                        return <div key={day + "-list"}>
                            <div  key={day}>
                                <div
                                    className="col-6 day-header">{days[day]['label']}</div>
                            </div>
                            <div >
                                {events}
                            </div>
                        </div>
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

        return <div className="col-6 event-view">

            <div className={"event-view-wrapper " + event['type']}>
                <div >
                    <a href="#"  onClick={(event) => onClick(event)}>
                        {X()}
                    </a><br/>
                </div>

                <div >
                    <div >
                        <h3>{event['title']}</h3>
                    </div>

                    <div >
                        <img
                             src={process.env.PUBLIC_URL + '/mps.png'}/>
                    </div>

                    <div className="col-12 metadata">
                        <span>
                            Location: <b>{event['location']['title']}</b>,
                            at <b>{moment.unix(event['startingDate']).utc().format(dateFormat)}</b>,&nbsp;
                        </span>
                        <span>
                            Starts at <b>{moment.unix(event['endingDate']).utc().format(dateFormatOnlyHour)}</b> and
                            ends at: <b>{this.refactorEndDate(event['startingDate'], event['endingDate'])}</b>
                        </span>
                    </div>

                    <div >

                        <p>
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

            </div>
        </div>
    }

    render() {
        return <div className="row events">
            <div className="col-12 event-separator">
                <hr/>
            </div>

            {this.List(this.state.events)}
            {this.EventView()}
        </div>
    }
}
