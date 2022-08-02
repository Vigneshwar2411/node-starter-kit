import React from 'react';
import { shallow } from 'enzyme';

import WelcomePage from 'client/javascripts/components/WelcomePage';

describe('<WelcomePage />', () => {
  const welcomePage = () => shallow(<WelcomePage />);

  test('should render', () => {
    expect(welcomePage()).toHaveLength(1);
  });
});
