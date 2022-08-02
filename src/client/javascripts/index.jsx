/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { logger as reduxLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers';
import { isNonProd, isLocal } from './utils/helpers';
import rootSaga from './sagas/root-saga';
import ErrorBoundary from './components/ErrorBoundary';
import config from './config';
import App from './components/App';
import ImageProvider from './components/ImageProvider';

import '../styles/main';

const composeEnhancers = (isNonProd() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const middlewares = () => {
  if (isLocal()) {
    return applyMiddleware(reduxLogger, sagaMiddleware, routerMiddleware(history));
  }
  return applyMiddleware(sagaMiddleware, routerMiddleware(history));
};

const store = createStore(reducer, composeEnhancers(middlewares()));
sagaMiddleware.run(rootSaga);

const renderApp = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ImageProvider source={`${config.cdnUrl}${config.appRoute}/images`}>
        <Provider store={store}>
          <ErrorBoundary>
            <ConnectedRouter history={history}>
              <Component />
            </ConnectedRouter>
          </ErrorBoundary>
        </Provider>
      </ImageProvider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/App').default;
    renderApp(NextApp);
  });
}
