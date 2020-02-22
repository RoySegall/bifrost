import React from 'react';
import Home from '../Components/Home/Home'
import Timeline from '../Components/Home/Timelines'
import {shallow, mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Testing the spinner of the app', () => {
    const home = shallow(<Home/>);
    expect(home.find('.loading').hasClass('fa-spinner')).toBe(true);

    home.setState({loading: false});
    expect(home.find('.loading i')).not.toBe(true);
});

test('Test the timeline component with partial yes', () => {
    const mockData = [
        {
            "id": "1",
            "title": "Roy's amazing trip",
            "startingDate": "2019-11-12T20:18:25",
            "endingDate": "2019-11-16T00:00:00",
            "flightSet": [
                {
                    "connectionFlight": {
                        "id": "2"
                    }
                }
            ],
            "pickingcarSet": [],
            "accommodationSet": [],
            "meetingconjunctionSet": [
                {
                    "id": "1"
                }
            ]
        }
    ];
    let timeline = mount(<Timeline timelines={mockData}/>);


    expect(timeline.find('.timeline-link').text()).toEqual("Roy's amazing trip");

    expect(timeline.find('.starting-date').text()).toEqual("2019-11-12T20:18:25");
    expect(timeline.find('.ending-date').text()).toEqual("2019-11-16T00:00:00");

    expect(timeline.find('.connection').text()).toEqual(' Connection flight - Yes,');
    expect(timeline.find('.picking-car').text()).toEqual(' Picking car - No,');
    expect(timeline.find('.accommodation').text()).toEqual(' Accommodation - No,');
    expect(timeline.find('.meeting-members').text()).toEqual(' Meeting other - Yes');
});
