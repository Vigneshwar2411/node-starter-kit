import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from 'client/javascripts/components/ErrorPage/ErrorPage';

describe('<ErrorPage />', () => {
  test('should render', () => {
    expect(shallow(<ErrorPage />)).toHaveLength(1);
  });

  test('should render components based on type', () => {
    const serverErrorWrapper = shallow(<ErrorPage type="500" />);
    expect(serverErrorWrapper.find('ServerError').exists()).toBeTruthy();

    const unauthorizedWrapper = shallow(<ErrorPage type="401" />);
    expect(unauthorizedWrapper.find('Unauthorized').exists()).toBeTruthy();
  });
});
