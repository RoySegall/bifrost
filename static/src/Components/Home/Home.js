import React from 'react';
import Timelines from './Timelines'
import axios from 'axios';

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
        let token = window.localStorage.getItem('token');
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND}/graphql/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            data: {
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
            }
        });
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
