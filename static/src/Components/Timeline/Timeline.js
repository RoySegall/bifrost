import React from 'react';
import {withRouter} from "react-router-dom";
import request from '../../Services/axios'
import Events from './Events';
import Filters from "./Filters";
import Head from "./Head"
import * as moment from 'moment';

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timeline: {},
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const params = {
            graphql: `
                query {
                    timeline(id: ${id}) {
                        id,
                        title,
                        startingDate,
                        endingDate,

                        flightSet {
                            id
                            title
                            origin
                            destination
                            startingDate
                            endingDate
                            location {
                              id
                            }
                            
                            connectionFlight {
                                id
                            }
                        },
                        pickingcarSet {
                                id
                        },
                        accommodationSet {
                            id
                            title
                            location {
                                id
                            },
                            startingDate
                            endingDate
                            hotelName
                            room
                        },
                        meetingconjunctionSet {
                            id
                            startingDate
                            members {
                              id
                            }
                            location {
                              id
                            }
                        }
                    },
                }`
        };

        const response = await request(params)();
        this.setState({timeline: orderTimeline(response.data.data.timeline)})
    }

    render() {

        if (!this.state.timeline.events) {
            return <></>;
        }

        return <div className="trip">
            <Head {...this.state.timeline} />
            <Filters/>
            <Events events={this.state.timeline.events}/>
        </div>
    }
}

function orderTimeline(timeline) {
    // Get the endpoint we need to start the timeline.
    const timelineInfo = {
        title: timeline.title,
        startingDate: timeline.startingDate,
        // todo: change to days.
        events: [],
    };

    const events = {};

    ['accommodationSet', 'flightSet', 'meetingconjunctionSet', 'pickingcarSet']
        .map(type => {
            timeline[type].map(event => {
                const startingDate = moment(event['startingDate']).utc(false);
                const format = 'D-M-YY';
                const day = startingDate.format(format);

                // Check first if we have the day key or not.
                if (Object.keys(events).indexOf(day) === -1) {
                    events[day] = {
                        timestamp: moment(day, format).utc(false).unix(),
                        events: [],
                    };
                }

                event['endingDate'] = moment(event['endingDate']).utc(false).unix();
                event['startingDate'] = moment(event['startingDate']).utc(false).unix();

                // Go over the event date and start to push events.
                events[day]['events'].push(event);
            });
        });

    // Sort the events and then sort the days.

    console.log(events);

    return timelineInfo;

    // Go over the items and sort them in a {timestamp:event-data} so we
    // could sort them by their time.

    // Go over the events, and place events at the end of the

    return {
        title: timeline.title,
        startingDate: timeline.startingDate,
        events: [
            {type: 'day', title: 'Today'},
            {type: 'flightSet', title: 'Flight to no were'},
            {type: 'pickingcarSet', title: 'Picking a car'},
            {type: 'accommodationSet', title: 'sleeping some where'},
            {type: 'meetingconjunctionSet', title: 'meeting memebers'},

            {type: 'day', title: 'Tomorrow, June 25th'},
            {type: 'flightSet', title: 'Flight to no were'},
            {type: 'pickingcarSet', title: 'Picking a car'},
            {type: 'accommodationSet', title: 'sleeping some where'},
            {type: 'meetingconjunctionSet', title: 'meeting memebers'},

            {type: 'day', title: 'Wednesday, June 27th'},
            {type: 'flightSet', title: 'Flight to no were'},
            {type: 'pickingcarSet', title: 'Picking a car'},
            {type: 'accommodationSet', title: 'sleeping some where'},
            {type: 'meetingconjunctionSet', title: 'meeting memebers'},

            {type: 'day', title: 'Thursday, June 28th'},
            {type: 'flightSet', title: 'Flight to no were'},
            {type: 'pickingcarSet', title: 'Picking a car'},
            {type: 'accommodationSet', title: 'sleeping some where'},
            {type: 'meetingconjunctionSet', title: 'meeting memebers'},
        ]
    };
}

export default withRouter(Timeline);
