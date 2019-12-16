import React from 'react';
import renderer from 'react-test-renderer';
import Head from '../../Components/Timeline/Head';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {June2519891030} from '../DatesConstans.test';

configure({adapter: new Adapter()});

// Snapshot of the component.
test("Testing the output of the timeline head component", () => {

    const timeline = {
        title: "Title for testing",
        startingDate: "2019-11-17T06:00:00",
    };
    const component = renderer.create(<Head {...timeline} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
