import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import config from '../../config';
import { RouterPaths } from '../../constants';
import DummyLoader from './DummyLoader';

import './ContentArea.style';

/* istanbul ignore next */
const WelcomePage = Loadable({
  loader: () => import('../WelcomePage'),
  loading: DummyLoader,
});

/* istanbul ignore next */
const FeatureFlagsPage = Loadable({
  loader: () => import('../FeatureFlagsPage'),
  loading: DummyLoader,
});

const getPath = path => config.appRoute + path;

const ContentArea = () => (
  <div className="content-area">
    <Switch>
      <Route path={getPath(RouterPaths.VIEW_FLAGS)} component={FeatureFlagsPage} />
      <Route path={getPath(RouterPaths.ROOT)} component={WelcomePage} />
      {/* place this route at the end to handle 404 */}
    </Switch>
  </div>
);

export default ContentArea;
