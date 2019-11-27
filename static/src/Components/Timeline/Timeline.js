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
                event['startingDate_original'] = event['startingDate'];
                event['startingDate'] = moment(event['startingDate']).utc(false).unix();
                event['type'] = type;

                // Go over the event date and start to push events.
                events[day]['events'].push(event);
            });
        });

    // Sort the events and then sort the days.
    const ordered = {};
    Object.keys(events).sort((a, b) => {
        if (events[a].timestamp > events[b].timestamp) {
            return 1;
        }
        if (events[a].timestamp < events[b].timestamp) {
            return -1;
        }
        return 0;
    }).forEach(function (key) {
        ordered[key] = events[key].events.sort((a, b) => {
            if (a.startingDate > b.startingDate) {
                return 1;
            }
            if (a.startingDate < b.startingDate) {
                return -1;
            }
            return 0;
        });

    });

    return timelineInfo;
}

export default withRouter(Timeline);
