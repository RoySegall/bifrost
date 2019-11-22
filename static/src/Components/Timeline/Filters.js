import React from 'react';


export default class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filters: [
                {'key': 'all', title: 'All'},
                {'key': 'pickingcarSet:', title: 'Picking car'},
                {'key': 'flightSet', title: 'Flight'},
                {'key': 'accommodationSet', title: 'Accommodation'},
                {'key': 'meetingconjunctionSet', title: 'Meet employees'},
            ],
            activeFilter: 'all',
        };
    }

    switchFilter(filter) {
        this.setState({activeFilter: filter});
    }

    List() {
        return this.state.filters.map((item, key) => {

            const active = this.state.activeFilter === item['key'] ? 'selected' : '';

            return <li
                key={key}
                className={"list-inline-item filter " + active}
                onClick={() => this.switchFilter(item['key'])}>
                {item['title']}
            </li>
        })
    }

    render() {
        return <div className="row filters">
            <div className="col-1">
                <b>Filter by:</b>
            </div>

            <div className="col-10">
                <ul className="filters float-left">
                    {this.List()}
                </ul>
            </div>
        </div>
    }

}
