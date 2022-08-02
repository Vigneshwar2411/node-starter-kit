import React from 'react';
import { shallow } from 'enzyme';

import ContentArea from 'client/javascripts/components/ContentArea';

describe('<ContentArea />', () => {
  test('should render', () => {
    const wrapper = shallow(<ContentArea isAdmin={false} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Route')).toHaveLength(2);
  });
});
