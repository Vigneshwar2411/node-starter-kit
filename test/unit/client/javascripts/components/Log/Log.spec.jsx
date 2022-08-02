import React from 'react';
import { shallow } from 'enzyme';

import Log from 'client/javascripts/components/Log/Log';

describe('<Log />', () => {
  describe('Rendering Tests', () => {
    test('should render', () => {
      expect(shallow(<Log />)).toHaveLength(1);
    });
  });

  describe('Lifecycle Methods Tests', () => {
    test('should fire componentDidMount with log prop', () => {
      const props = {
        log: jest.fn(),
        where: 'where',
        error: { message: 'error' },
        info: { message: 'info' },
      };

      const wrapper = shallow(<Log {...props} />);
      const componentDidMountSpy = jest.spyOn(wrapper.instance(), 'componentDidMount');
      wrapper.instance().componentDidMount();
      expect(componentDidMountSpy).toHaveBeenCalled();
      expect(props.log).toHaveBeenLastCalledWith('where', { message: 'error' }, { message: 'info' });
    });
  });
});
