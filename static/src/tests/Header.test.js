import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Components/Header';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Testing the header component', () => {

    const component = renderer.create(<Header />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});