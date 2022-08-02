/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import Image from 'client/javascripts/components/Image/Image';

describe('<Image />', () => {
  test('should render', () => {
    expect(shallow(<Image image="sample.png" />).exists()).toBeTruthy();
  });

  // test('should get hashed image name', () => {
  //   window.assets = {
  //     'sample.png': 'sample-87623487629.png',
  //   };
  //   const { src } = shallow(<Image image="sample.png" />).find('img').props;
  //   expect(src).toEqual('sample-87623487629.png');
  // });
  //
  // test('should get default image name if assets not present', () => {
  //   window.assets = null;
  //   const { src } = shallow(<Image image="sample.png" />).find('img').props;
  //   expect(src).toEqual('sample.png');
  // });
});
