import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../Components/Login'

test('Testing the login component', () => {

    const component = renderer.create(<Login />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});