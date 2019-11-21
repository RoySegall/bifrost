import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../Components/Login';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Testing the login component', () => {

    const component = renderer.create(<Login />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Testing the icon change as we focus on elements', () => {

    const login = shallow(<Login />);
    expect(login.find('.icon i').hasClass('fa-sign-in')).toBe(true);

    login.find('#username').simulate('focus');

    expect(login.find('.icon i').hasClass('fa-eye')).toBe(true);

    login.find('#password').simulate('focus');

    expect(login.find('.icon i').hasClass('fa-eye-slash')).toBe(true);
});

test('Testing login form validation', () => {
   const login = shallow(<Login />);

   // login.find('.form-group.actions button').simulate('click');

});
