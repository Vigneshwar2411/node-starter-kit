import React from 'react';
import { shallow } from 'enzyme';

import FeatureFlag from 'client/javascripts/components/FeatureFlag/FeatureFlag';

describe('<FeatureFlag />', () => {
  let props;
  const featureFlag = children => shallow(<FeatureFlag {...props}>{children}</FeatureFlag>);

  beforeEach(() => {
    props = {
      flag: 'thing',
      show: undefined,
    };
  });

  test('should render', () => {
    expect(featureFlag()).toHaveLength(1);
  });

  test('should render null when feature is toggled off', () => {
    props.show = false;
    expect(featureFlag(<span />).find('span')).toHaveLength(0);
  });

  test('should render children when feature is toggled on', () => {
    props.show = true;
    expect(featureFlag(<span />).find('span')).toHaveLength(1);
  });
});
