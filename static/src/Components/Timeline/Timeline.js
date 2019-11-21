import React from 'react';
import {withRouter} from "react-router-dom";
import request from '../../Services/axios'


class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timeline: {},
            filters: {
                all: 'All',
                pickingcarSet: 'Picking car',
                flightSet: 'Flight',
                accommodationSet: 'Accommodation',
                meetingconjunctionSet: 'Meet employees',
            },
            activeFilter: 'all',
            activeEvent: null
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


    switchFilter(filter) {
        this.setState({activeFilter: filter});
    }

    setEventView(id) {
        this.setState({activeEvent: id})
    }

    hideExtra() {
        this.setState({activeEvent: null})
    }

    render() {
        return <div className="trip">
            <h2>
                {this.state.timeline.title}, starts
                at: {this.state.timeline.startingDate}
            </h2>

            <div className="row filters">
                <div className="col-1">
                    <b>Filter by:</b>
                </div>

                <div className="col-10">
                    <ul className="filters float-left">
                        {Object.keys(this.state.filters).map((item, key) => {
                            const title = this.state.filters[item];

                            const className = this.state.activeFilter === item ? 'selected' : '';

                            return <li
                                key={key}
                                className={"list-inline-item filter " + className}
                                onClick={() => this.switchFilter(item)}>
                                {title}
                            </li>
                        })}
                    </ul>
                </div>
            </div>

            <div className="row events">
                <div className="col-8">
                    <div className="list">
                        {
                            this.state.timeline.events ?
                                this.state.timeline.events.map((item, key) => {
                                    return <div key={key}>
                                        <a href='#' onClick={(event) => {
                                            event.preventDefault();
                                            this.setEventView(key);
                                        }}>{item['title']}</a>
                                    </div>
                                })
                                : null
                        }
                    </div>
                </div>

                {
                    this.state.activeEvent !== null ?
                        <div className="col-4">
                            <a href="#" onClick={event => {
                                event.preventDefault();
                                this.hideExtra();
                            }}>Close</a><br/>
                            {this.state.timeline.events[this.state.activeEvent]['title']}
                        </div> :
                        null
                }

            </div>
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
