import React from 'react';
import Timelines from './Timelines'

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

    getCookie(name) {
        const r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
        return r ? r[1] : null;
    };

    fetchData = async () => {
        this.setState({loading: true});

        // const response = await fetch('graphql/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRFToken': this.getCookie('csrftoken'),
        //     },
        //     body: JSON.stringify({
        //         query: `
        //         query {
        //             timelines {
        //                 id,
        //                 title,
        //                 startingDate,
        //                 endingDate,
        //
        //                 flightSet {
        //                     connectionFlight {
        //                         id
        //                     }
        //                 },
        //                 pickingcarSet {
        //                         id
        //                 },
        //                 accommodationSet {
        //                         id
        //                 },
        //                 meetingconjunctionSet {
        //                     id
        //                 }
        //             },
        //         }`,
        //     }),
        // });

        // const results = await response.json();
        // this.setState({loading: false, timelines: results.data.timelines})
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
