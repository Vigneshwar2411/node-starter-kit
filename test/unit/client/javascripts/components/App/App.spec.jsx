import React from 'react';
import App from 'client/javascripts/components/App/App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  describe('Rendering Tests', () => {
    test('should render when authorized', () => {
      const props = {
        authorized: true,
        isAuthorizing: false,
        authorize: () => ({}),
        profile: {
          name: 'John Doe',
          admin: true,
        },
      };
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.find('.authorizing').exists()).toBeFalsy();
      expect(wrapper.find('AppInfo').exists()).toBeTruthy();
    });

    test('should render when authorizing', () => {
      const props = {
        authorized: false,
        isAuthorizing: true,
        authorize: () => ({}),
        profile: {
          name: '',
          admin: false,
        },
      };
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.find('.authorizing').exists()).toBeTruthy();
      expect(wrapper.find('AppInfo').exists()).toBeFalsy();
    });

    test('should render login error when unauthorized', () => {
      const props = {
        authorized: false,
        isAuthorizing: false,
        authorize: () => ({}),
        profile: {
          name: '',
          admin: false,
        },
      };
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.text()).toStrictEqual('There was a problem with your login.');
    });
  });

  describe('Lifecycle Methods Tests', () => {
    test('should fire authorize on componentDidMount', () => {
      const props = {
        authorized: false,
        isAuthorizing: true,
        authorize: jest.fn(),
        profile: {
          name: '',
          admin: false,
        },
      };
      const wrapper = shallow(<App {...props} />);
      wrapper.instance().componentDidMount();
      expect(props.authorize).toHaveBeenCalled();
    });
  });
});
