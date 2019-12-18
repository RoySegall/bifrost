import React from 'react';
import {withRouter} from "react-router-dom";
import request from '../../Services/axios'
import Events from './Events';
import Filters from "./Filters";
import Head from "./Head"
import {dateFormat, dateFormatWithDay, convertFromBackendToUtc} from '../../Services/consts';

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
                              title,
                              address
                            }
                            
                            connectionFlight {
                                id
                            }
                        },
                        pickingcarSet {
                            title
                            id
                            startingDate
                            endingDate
                            location {
                              id
                              title,
                              address
                            }
                        },
                        accommodationSet {
                            id
                            title
                            location {
                              id
                              title,
                              address
                            },
                            startingDate
                            endingDate
                            hotelName
                            room
                        },
                        meetingconjunctionSet {
                            id
                            title
                            startingDate
                            endingDate
                            members {
                              id
                            }
                            location {
                              id
                              title,
                              address
                            }
                        }
                    },
                }`
        };
        const response = await request(params)();
        this.setState({timeline: OrderTimeline(response.data.data.timeline)})
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

/**
 * Ordering the timeline by their  - day in the trip and by their time in the
 * day which they belongs to.
 *
 * @param timeline
 *  The timeline results we got from the server.
 *
 * @returns {{title: *, startingDate: (*|string), events: Array}}
 *  An or dates by days in the trip.
 *
 * @constructor
 */
const OrderTimeline = (timeline) => {
    // Get the endpoint we need to start the timeline.
    const timelineInfo = {
        title: timeline.title,
        startingDate: timeline.startingDate,
        events: [],
    };

    const days = {};

    ['accommodationSet', 'flightSet', 'meetingconjunctionSet', 'pickingcarSet']
        .map(type => {
            timeline[type].map(event => {
                const startingDate = convertFromBackendToUtc(event['startingDate']);
                const day = startingDate.format(dateFormat);

                // Check first if we have the day key or not.
                if (Object.keys(days).indexOf(day) === -1) {
                    days[day] = {
                        timestamp: convertFromBackendToUtc(day, dateFormat).unix(),
                        events: [],
                        label: startingDate.format(dateFormatWithDay)
                    };
                }
                event['endingDate'] = convertFromBackendToUtc(event['endingDate']).unix();
                event['startingDate'] = convertFromBackendToUtc(event['startingDate']).unix();
                event['type'] = type;

                // Go over the event date and start to push events.
                days[day]['events'].push(event);
            });
        });

    // Sort the events and then sort the days.
    const ordered = {'events': [], 'label': ''};
    Object.keys(days).sort((a, b) => {
        if (days[a].timestamp > days[b].timestamp) {
            return 1;
        }
        if (days[a].timestamp < days[b].timestamp) {
            return -1;
        }
        return 0;
    }).forEach(function (key) {
        ordered[key] = {'label': '', 'events': days[key].events.sort((a, b) => {
            if (a.startingDate > b.startingDate) {
                return 1;
            }
            if (a.startingDate < b.startingDate) {
                return -1;
            }
            return 0;
        })};
    });

    timelineInfo.events = days;

    return timelineInfo;
};

const RouteTimeline = withRouter(Timeline);

export {RouteTimeline, OrderTimeline};
