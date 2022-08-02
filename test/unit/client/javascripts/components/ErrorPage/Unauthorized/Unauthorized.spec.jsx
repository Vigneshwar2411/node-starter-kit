import React from 'react';
import { shallow } from 'enzyme';

import Unauthorized from 'client/javascripts/components/ErrorPage/Unauthorized/Unauthorized';

describe('<Unauthorized />', () => {
  test('should render', () => {
    const wrapper = shallow(<Unauthorized />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.unauthorized p').text()).toStrictEqual('There was a problem with your login.');
  });
});
