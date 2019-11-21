import React from "react";
import FormError from '../Components/FormError';
import renderer from 'react-test-renderer';

test('Testing the form error component.', () => {
  const emptyFormError = renderer
    .create(<FormError />)
    .toJSON();
  expect(emptyFormError).toMatchSnapshot();

  const DangerFormError = renderer
    .create(<FormError type="danger" message="This an error" />)
    .toJSON();
  expect(DangerFormError).toMatchSnapshot();


  const SuccessFormError = renderer
    .create(<FormError type="success" message="This a success message" />)
    .toJSON();
  expect(SuccessFormError).toMatchSnapshot();
});
