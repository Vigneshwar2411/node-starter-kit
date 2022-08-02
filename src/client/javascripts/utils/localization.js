import _get from 'lodash/get';
import _template from 'lodash/template';
import * as Content from '../static_content';

const translate = (contentPath, values) => {
  const string = _get(Content, contentPath, null);
  return values && string ? _template(string)(values) : string;
};

export default {
  t: translate,
};
