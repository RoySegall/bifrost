import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../Components/Login';
import {shallow, mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Testing the login component', () => {

    const component = renderer.create(<Login/>);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Testing login form validation', () => {
    const login = mount(<Login/>);
    const event = {
        preventDefault: () => {
        }
    };

    // Mock the event for the the onclick button.
    jest.spyOn(event, 'preventDefault');

    // Click on the button and verify the event was triggered.
    login.find('.button').simulate('click', event);
    expect(event.preventDefault).toBeCalled();

    // Verify we got the error.
    expect(login.find('.alert-error').text()).toEqual('Username is required');

    // Fill in the user, submit the form and make sure we got an error relate to the email.
    login.setState({ username: 'bar' });
    login.find('button').simulate('click', event);

    expect(login.find('.alert-error').text()).toEqual('Password is required');

    // Setting the password.
    login.setState({ password: 'bar' });

    // Submitting the form.
    login.find('button').simulate('click', event);
});
