import React from 'react';
import { shallow } from 'enzyme';
import FeatureFlagsPage from 'client/javascripts/components/FeatureFlagsPage/FeatureFlagsPage';

describe('<FeatureFlagsPage />', () => {
  test('should render', () => {
    expect(shallow(<FeatureFlagsPage flags={{}} />)).toHaveLength(1);
  });

  test('should render header', () => {
    expect(shallow(<FeatureFlagsPage flags={{}} />).find('.title').text()).toStrictEqual('Feature Flags');
  });

  test('should render the flags', () => {
    const props = {
      flags: {
        flags: ['flag'],
        local: {
          flag: 'value',
        },
        dev: {
          flag: false,
        },
        qa: {},
        uat: {},
        production: {},
      },
    };
    const wrapper = shallow(<FeatureFlagsPage {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  test('should fire componentDidMount', () => {
    const props = {
      flags: {},
      getFlags: jest.fn(),
    };
    const wrapper = shallow(<FeatureFlagsPage {...props} />);
    const componentDidMountSpy = jest.spyOn(wrapper.instance(), 'componentDidMount');
    expect(wrapper.exists()).toBeTruthy();
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
    expect(props.getFlags).toHaveBeenCalled();
  });
});
