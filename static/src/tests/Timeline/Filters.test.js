import React from 'react';
import renderer from 'react-test-renderer';
import Filters from '../../Components/Timeline/Filters';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});


test("Testing the snapshot of the component", () => {

    const component = renderer.create(<Filters/>);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Testing the filter changing", () => {

    const filters = mount(<Filters/>);
    const event = {
        preventDefault: () => {
        }
    };

    // Mock the event for the the onclick button.
    jest.spyOn(event, 'preventDefault');

    // Verify we got the filters.
    expect(filters.find('.fal')).toHaveLength(5);

    // Click on the button and verify the event was triggered.
    filters.find('button.pickingcarSet').simulate('click');
    expect(filters.instance().state.activeFilter).toBe('pickingcarSet');

    filters.find('button.flightSet').simulate('click');
    expect(filters.instance().state.activeFilter).toBe('flightSet');

    filters.find('button.accommodationSet').simulate('click');
    expect(filters.instance().state.activeFilter).toBe('accommodationSet');

    filters.find('button.meetingconjunctionSet').simulate('click');
    expect(filters.instance().state.activeFilter).toBe('meetingconjunctionSet');

    filters.find('button.all').simulate('click');
    expect(filters.instance().state.activeFilter).toBe('all');
});
