import React from 'react';
import {withRouter} from "react-router-dom";
import request from '../../Services/axios'
import Events from './Events';
import Filters from "./Filters";
import Head from "./Head"


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
            <Filters />
            <Events events={this.state.timeline.events} />
        </div>
    }
}

function orderTimeline(timeline) {
    // Get the endpoint we need to start the timeline.
    const startTime = null;

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
