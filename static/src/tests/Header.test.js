import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Components/Header';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Testing the header component', () => {

    const component = renderer.create(<Header />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Testing the logout button', () => {
    // Set a generic access token.
    localStorage.setItem('token', '🍕');

    const header = mount(<Header />);

    expect(localStorage.getItem('token')).toBe('🍕');

    header.find('#logout').simulate('click');

    expect(localStorage.getItem('token')).toBe(null);
});
