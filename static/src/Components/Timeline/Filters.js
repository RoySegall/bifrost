import React from 'react';
import {Calendar, Car, Plane, Hotel, Friends} from '../../Fonts'


export default class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filters: [
                {'key': 'all', title: 'All events', icon: Calendar(), first: true},
                {'key': 'pickingcarSet', title: 'Picking car', icon: Car()},
                {'key': 'flightSet', title: 'Flight', icon: Plane()},
                {'key': 'accommodationSet', title: 'Accommodation', icon: Hotel()},
                {'key': 'meetingconjunctionSet', title: 'Meet employees', icon: Friends()},
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
                className={`pr-4 ${item['key']} ${active} ${first}`}
                onClick={() => this.switchFilter(item['key'])}>
                <span>{item['icon']} {item['title']}</span>
            </li>
        })
    }

    render() {
        return <div>
            <ul className="flex flex-row justify-start pt-4">{this.List()}</ul>
        </div>
    }
}
