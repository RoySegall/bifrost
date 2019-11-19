function Home() {
    return <div>Hello!</div>
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timelines: [],
            loading: false
        };
    }

    async componentDidMount() {
        await this.fetchData()
    }

    getCookie(name) {
        const r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
        return r ? r[1] : null;
    };

    fetchData = async () => {
        this.setState({loading: true});

        const response = await fetch('graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken'),
            },
            body: JSON.stringify({
                query: `
                query {
                    timelines {
                        id,
                        title,
                        startingDate,
                        endingDate,

                        flightSet {
                            connectionFlight {
                                id
                            }
                        },
                        pickingcarSet {
                                id
                        },
                        accommodationSet {
                                id
                        },
                        meetingconjunctionSet {
                            id
                        }
                    },
                }`,
            }),
        });

        const results = await response.json();
        this.setState({loading: false, timelines: results.data.timelines})
    };

    render() {
        if (this.state.loading) {
            return <div className="text-center">
                <i className="loading fad fa-spinner fa-spin"></i>
            </div>
        }

        return <Timelines timelines={this.state.timelines} />
    }
}

/**
 * Checking if the employee has any connection flight.
 *
 * @param flights
 *  List of flights.
 */
const hasConnectionFlight = (flights) => {
    let connectionFlightExists = false;

    flights.map(flight => {
        // The first flight has a connection flight. That's enough for us.
        if (flight.connectionFlight !== undefined) {
            connectionFlightExists = true;
            return false;
        }
    });

    return connectionFlightExists;
};

/**
 * Checking if the employee need to pick a rental car.
 *
 * @param pickingCar
 *  List of picking car events.
 */
const hasPickingCarEvent = (pickingCar) => {
    return pickingCar.length;
};

/**
 * Checking if the employee has accommodation.
 * @param accommodation
 *  The accommodation list.
 */
const hasAccommodation = (accommodation) => {
    return accommodation.length;
};

/**
 * Check if the employee need to meet other employees during his trip.
 *
 * @param meeting
 *  List meeting events.
 */
const hasMeetMembers = (meeting) => {
    return meeting.length;
};



/**
 * Generating the extra data of a timeline.
 *
 * @param timeline
 *  The timeline object.
 *
 * @returns {*}
 *  Generated extra info.
 */
function extraInfo(timeline) {
    return <ul className="list-inline">
        <li className="list-inline-item"><i className="fal fa-exchange"></i> Connection flight - {YesNo(hasConnectionFlight(timeline.flightSet))},</li>
        <li className="list-inline-item"><i className="fal fa-car"></i> Picking car - {YesNo(hasPickingCarEvent(timeline.pickingcarSet))},</li>
        <li className="list-inline-item"><i className="fal fa-hotel"></i> Accommodation - {YesNo(hasAccommodation(timeline.accommodationSet))},</li>
        <li className="list-inline-item"><i className="fal fa-user-friends"></i> Meeting other - {YesNo(hasMeetMembers(timeline.meetingconjunctionSet))}</li>
    </ul>
}