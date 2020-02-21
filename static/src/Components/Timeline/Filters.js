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

      const bg = this.state.activeFilter === item['key'] ? 'bg-green-500' : 'bg-indigo-600';
      const first = item['first'] ? 'first' : '';

      return <li
        key={key}
        onClick={() => this.switchFilter(item['key'])}>
          <button className={`
            text-gray-100 hover:text-gray-500 active:text-red-400
            bg-indigo-600 active:bg-yellow-400
            font-bold pt-2 pb-2 pl-4 pr-4 ml-2 rounded
          `}>
              <span>{item['icon']}</span>
              <span className="pl-2">{item['title']}</span>
          </button>
      </li>
    })
  }

  render() {
    return <div>
      <ul className="flex flex-row justify-start pt-4">{this.List()}</ul>
    </div>
  }
}
