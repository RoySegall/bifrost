import React from 'react';
import Timelines from './Timelines'
import request from '../../Services/axios';
import {Loading} from '../../Fonts';

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
            return <div className="text-center">{Loading()}</div>
        }

        return <>

            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="rounded-lg md:w-56"
                         src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                         alt="Woman paying for a purchase" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">Marketing</div>
                    <a href="#"
                       className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Finding
                        customers for your new business</a>
                    <p className="mt-2 text-gray-600">Getting a new business off the ground is a lot of hard work. Here
                        are five ideas you can use to find your first customers.</p>
                </div>
            </div>
            <Timelines timelines={this.state.timelines} />
        </>
    }
}
