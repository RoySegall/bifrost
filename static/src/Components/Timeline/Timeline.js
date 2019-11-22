import React from 'react';
import {withRouter} from "react-router-dom";
import request from '../../Services/axios'
import Events from './Events';
import Filters from "./Filters";


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
                              lat
                              long
                              title
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
            <h2>
                {this.state.timeline.title}, starts
                at: {this.state.timeline.startingDate}
            </h2>

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
            {type: 'flightSet', title: 'Flight to no were'},
            {type: 'pickingcarSet', title: 'Picking a car'},
            {type: 'accommodationSet', title: 'sleeping some where'},
            {type: 'meetingconjunctionSet', title: 'sleeping some where'},
            {type: 'flightSet', title: 'Flight to no were'},
            {type: 'pickingcarSet', title: 'Picking a car'},
            {type: 'accommodationSet', title: 'sleeping some where'},
            {type: 'meetingconjunctionSet', title: 'sleeping some where'},
            {type: 'flightSet', title: 'Flight to no were'},
            {type: 'pickingcarSet', title: 'Picking a car'},
            {type: 'accommodationSet', title: 'sleeping some where'},
            {type: 'meetingconjunctionSet', title: 'sleeping some where'},
            {type: 'flightSet', title: 'Flight to no were'},
            {type: 'pickingcarSet', title: 'Picking a car'},
            {type: 'accommodationSet', title: 'sleeping some where'},
            {type: 'meetingconjunctionSet', title: 'sleeping some where'},
        ]
    };
}

export default withRouter(Timeline);
