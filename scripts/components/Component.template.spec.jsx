import React from 'react';
import { shallow } from 'enzyme';

import __NAME__ from '__COMP_PATH__/__NAME__';

describe('<__NAME__ />', () => {
  test('should render', () => {
    const wrapper = shallow(<__NAME__ />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
