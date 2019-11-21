import React from 'react';
import Timelines from './Timelines'
import request from '../../Services/axios';

export default class Home extends React.Component {
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

    fetchData = async () => {
        this.setState({loading: true});

        const params = {
            graphql: `
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
                }`
        };

        const response = await request(params)();
        this.setState({loading: false, timelines: response.data.data.timelines})
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
