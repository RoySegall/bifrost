import React from 'react';
import {withRouter} from "react-router-dom";
import request from '../../Services/axios'
import Events from './Events';
import Filters from "./Filters";
import Head from "./Head"
import * as moment from 'moment';
import {dateFormat, dateFormatWithDay} from '../../Services/consts';

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
                const day = startingDate.format(dateFormat);

                // Check first if we have the day key or not.
                if (Object.keys(events).indexOf(day) === -1) {
                    events[day] = {
                        timestamp: moment(day, dateFormat).utc(false).unix(),
                        events: [],
                        label: startingDate.format(dateFormatWithDay)
                    };
                }


                event['endingDate'] = moment(event['endingDate']).utc(false).unix();
                event['startingDate'] = moment(event['startingDate']).utc(false).unix();
                event['type'] = type;

                // Go over the event date and start to push events.
                events[day]['events'].push(event);
            });
        });

    // Sort the events and then sort the days.
    const ordered = {'events': [], 'label': ''};
    Object.keys(events).sort((a, b) => {
        if (events[a].timestamp > events[b].timestamp) {
            return 1;
        }
        if (events[a].timestamp < events[b].timestamp) {
            return -1;
        }
        return 0;
    }).forEach(function (key) {
        ordered[key] = {'label': '', 'events': events[key].events.sort((a, b) => {
            if (a.startingDate > b.startingDate) {
                return 1;
            }
            if (a.startingDate < b.startingDate) {
                return -1;
            }
            return 0;
        })};
    });

    timelineInfo.events = events;

    return timelineInfo;
}

const RouteTimeline = withRouter(Timeline);

export {RouteTimeline, orderTimeline};
