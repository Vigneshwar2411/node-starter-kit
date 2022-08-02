import React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from 'client/javascripts/components/ErrorBoundary/ErrorBoundary';

describe('<ErrorBoundary />', () => {
  const wrapper = shallow(<ErrorBoundary />);

  describe('Rendering Tests', () => {
    test('should render', () => {
      expect(wrapper.exists()).toBeTruthy();
    });

    test('should render for unauthorized', () => {
      wrapper.setState({
        error: {
          message: 'Unauthorized',
          type: '401',
        },
      });
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  describe('Error Tests', () => {
    test('should give a default error message if an error occur and it does not have an error message', () => {
      wrapper.setState({ error: new Error() });

      const { error } = wrapper.state();

      expect(error.message).toEqual('Unknown Error');
    });

    test('should give the right error message if an error occur that has an error message', () => {
      wrapper.setState({ error: new Error('The error that we deserve, but don\'t need') });

      const { error } = wrapper.state();

      expect(error.message).toEqual('The error that we deserve, but don\'t need');
    });
  });

  describe('Lifecycle Methods Tests', () => {
    test('should fire componentDidCatch and set the state', () => {
      wrapper.setState({
        error: undefined,
        errorInfo: undefined,
      });

      const componentDidCatchSpy = jest.spyOn(wrapper.instance(), 'componentDidCatch');

      wrapper.instance().componentDidCatch({ error: 'error' }, {});

      expect(componentDidCatchSpy).toHaveBeenCalledWith({ error: 'error', message: 'Unknown Error' }, {});
      expect(wrapper.state().error).toStrictEqual({ error: 'error', message: 'Unknown Error' });
      expect(wrapper.state().errorInfo).toStrictEqual({});
    });
  });
});
