import React from 'react';
import { shallow } from 'enzyme';

import DummyLoader from 'client/javascripts/components/ContentArea/DummyLoader/DummyLoader';

describe('<DummyLoader />', () => {
  test('should render', () => {
    expect(shallow(<DummyLoader />)).toHaveLength(1);
  });
});
