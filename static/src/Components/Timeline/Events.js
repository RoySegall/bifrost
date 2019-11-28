import React from 'react';
import {X, Car, Hotel, Plane, Friends} from '../../Fonts'
import {dateFormatOnlyHour, dateFormatWithHour} from '../../Services/consts'
import * as moment from 'moment';

export default class Events extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: props['events'],
            activeEvent: null,
        };
    }

    setEventView(selectedEvent) {
        if (this.state.activeEvent) {
            if (
                this.state.activeEvent['day'] === selectedEvent['day'] &&
                this.state.activeEvent['key'] === selectedEvent['key']
            ) {
                this.hideExtra();
                return;
            }
        }

        this.setState({activeEvent: selectedEvent})
    }

    hideExtra() {
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
        const startingFrom = moment.unix(startDate);
        const endingFromUnix = moment.unix(endDate);

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

        return <div className="col-12">
            <div className="row head">
                <div className="col-6">{icon}</div>
                <div className="col-6 text-right">{moment.unix(event['startingDate']).format(dateFormatOnlyHour)}</div>
                <hr/>
            </div>
        </div>
    }

    eventBody(event, day, key) {
        const onClick = (event, day, key) => {
            event.preventDefault();
            this.setEventView({day, key});
        };

        return <div className="col-12">
            <div className="row body">
                <div className="col-6">
                    <a href='#' className="title" onClick={(event) => onClick(event, day, key)}>
                        {event['title']}
                    </a>
                </div>

                <div className="col-6 text-right">
                    Ends at: {this.refactorEndDate(event['startingDate'], event['endingDate'])}
                </div>

                <div className="col-12">
                    <p>Lorem Ipsum is simply dummy text of
                        the
                        printing and typesetting industry.
                        Lorem
                        Ipsum has been the industry's
                        standard
                        dummy text ever since the 1500s,
                    </p>
                </div>
            </div>
        </div>
    }

    List(days) {
        const col = this.state.activeEvent === null ? 'col-12 full-event' : 'col-6';
        return <div className={"slow-transition " + col}>
            <div className="list">
                {
                    Object.keys(days).map(day => {
                        const events = days[day]['events'].map((event, key) => {
                            return <div key={event['id'] + "-" + event['type']} className={"row event " + event['type']}>
                                {this.eventHead(event)}
                                {this.eventBody(event, day, key)}
                            </div>
                        });

                        return <div key={day + "-list"}>
                            <div className="row" key={day}>
                                <div
                                    className="col-6 day-header">{days[day]['label']}</div>
                            </div>
                            {events}
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
            this.hideExtra();
        };

        return <div className="col-6 hidden">

            <div className={"event-view-wrapper " + event['type']}>
                <div className="actions">
                    <a href="#" onClick={(event) => onClick(event)}>
                        {X()}
                    </a><br/>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h3>{event['title']}</h3>
                    </div>

                    <div className="map">
                        <img className="img-fluid"
                             src={process.env.PUBLIC_URL + '/mps.png'}/>
                    </div>

                    <div className="col-12 metadata">
                        Location: <b>location title</b>, at <b>June 25th
                        14:00</b>.
                        &nbsp;Starts at: <b>Foo</b> &nbsp;and ends
                        at: <b>Bar</b>.
                    </div>

                    <div className="col-12 body">

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
