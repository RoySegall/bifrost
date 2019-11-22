import React from 'react';


export default class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filters: [
                {'key': 'all', title: 'All events', icon: 'fal fa-calendar-alt', first: true},
                {'key': 'pickingcarSet:', title: 'Picking car', icon: 'fal fa-car'},
                {'key': 'flightSet', title: 'Flight', icon: 'fal fa-plane'},
                {'key': 'accommodationSet', title: 'Accommodation', icon: 'fal fa-hotel'},
                {'key': 'meetingconjunctionSet', title: 'Meet employees', icon: 'fal fa-user-friends'},
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
            const first = item['first'] ? 'first' : '';

            return <li
                key={key}
                className={`list-inline-item filter ${active} ${first}`}
                onClick={() => this.switchFilter(item['key'])}>
                <span><i className={item['icon']}></i> {item['title']}</span>
            </li>
        })
    }

    render() {
        return <div className="row">

            <div className="col-12 filters">
                <ul className="filters float-left">{this.List()}</ul>
            </div>

        </div>
    }

}
