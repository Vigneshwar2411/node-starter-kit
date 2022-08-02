import React from 'react';
import { shallow } from 'enzyme';

import AppInfo from 'client/javascripts/components/AppInfo/AppInfo';

describe('<AppInfo />', () => {
  test('should render', () => {
    const wrapper = shallow(<AppInfo name="name" />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.header-info').exists()).toBeTruthy();
    expect(wrapper.find('.mrcooper-logo').exists()).toBeTruthy();
    expect(wrapper.find('.app-logo').exists()).toBeTruthy();
    expect(wrapper.find('.app-logo').text().trim()).toStrictEqual('App Logo');
    expect(wrapper.find('.header-info__right').exists()).toBeTruthy();
    expect(wrapper.find('.user-name').exists()).toBeTruthy();
    expect(wrapper.find('.user-name').text().trim()).toStrictEqual('name');
  });
});
