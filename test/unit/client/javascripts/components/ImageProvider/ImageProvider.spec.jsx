import React from 'react';
import { shallow } from 'enzyme';

import ImageProvider from 'client/javascripts/components/ImageProvider/ImageProvider';

describe('<ImageProvider />', () => {
  test('should render', () => {
    expect(shallow(<ImageProvider />).exists()).toBeTruthy();
  });

  // test('should provide src via context', () => {
  //   const src = '/some/url';
  //   const wrapper = shallow(<ImageProvider source={src} />);
  //
  //   expect(wrapper.instance().getChildContext()).toStrictEqual({
  //     imageSource: '/some/url',
  //   });
  // });
});
