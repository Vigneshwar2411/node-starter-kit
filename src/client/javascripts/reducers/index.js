import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import featureFlags from './feature-flags-reducer';
import allFeatureFlags from './all-feature-flags-reducer';
import logsQueue from './logs-queue-reducer';
import authReducer from './auth-reducer';

export const reducers = {
  routing: routerReducer,
  featureFlags,
  allFeatureFlags,
  logsQueue,
  authReducer,
};

export default combineReducers(reducers);
