import React from 'react';
import { shallow } from 'enzyme';
import L from 'client/javascripts/utils/localization';
import ServerError from 'client/javascripts/components/ErrorPage/ServerError/ServerError';

describe('<ServerError />', () => {
  test('should render', () => {
    expect(shallow(<ServerError />)).toHaveLength(1);
  });

  test('should display static content with title', () => {
    const wrapper = shallow(<ServerError title="test title" />);
    expect(wrapper.find('.title').text()).toEqual('test title');
    expect(wrapper.find('p').getElements()[0].props.children).toContain(L.t('ErrorPage.serverError.descriptionLine1'));
  });

  test('should display static content without title', () => {
    const wrapper = shallow(<ServerError />);
    expect(wrapper.find('.title').text()).toEqual(L.t('ErrorPage.serverError.title'));
    expect(wrapper.find('p').getElements()[0].props.children).toContain(L.t('ErrorPage.serverError.descriptionLine1'));
  });
});
