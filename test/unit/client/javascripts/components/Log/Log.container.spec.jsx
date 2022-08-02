import React from 'react';
import store from 'redux-mock-store';
import Log from 'client/javascripts/components/Log';
import { shallow } from 'enzyme';

const configureStore = store([]);

describe('Logs Container', () => {
  const mockStore = configureStore({});
  mockStore.dispatch = jest.fn();

  beforeEach(() => {
    mockStore.dispatch.mockClear();
  });

  describe('Actions Test', () => {
    describe('log Action', () => {
      test('should fire log action with error', () => {
        const wrapper = shallow(<Log store={mockStore} />);
        wrapper.props().log('where', 'err');
        expect(mockStore.dispatch).toHaveBeenCalled();
      });

      test('should fire log action with info', () => {
        const wrapper = shallow(<Log store={mockStore} />);
        wrapper.props().log('where', null, 'info');
        expect(mockStore.dispatch).toHaveBeenCalled();
      });
    });
  });
});
