/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
import co from 'co';
import * as sideEffects from 'redux-saga/effects';
import { getFeatureFlags as fetchFeatureFlags } from 'client/javascripts/api/feature-flags';
import { updateFeatureFlags } from 'client/javascripts/actions';
import { FETCH_FEATURE_FLAGS } from 'client/javascripts/actions/types';

jest.mock('redux-saga/effects');

describe('Feature Flags Saga', () => {
  let getFeatureFlags;
  const featureFlags = {
    shouldShowFirstComponent: true,
    shouldShowSecondComponent: false,
  };


  beforeEach(() => {
    sideEffects.call.mockClear();
    sideEffects.put.mockClear();
    sideEffects.takeEvery.mockClear();
    getFeatureFlags = require('../../../../../src/client/javascripts/sagas/feature-flags-saga').getFeatureFlags;
  });

  test('should update the feature flags from the API', () => {
    sideEffects.call.mockResolvedValue(featureFlags);
    sideEffects.put.mockResolvedValue();
    return co(function* () {
      yield getFeatureFlags();
      expect(sideEffects.call).lastCalledWith(fetchFeatureFlags);
      expect(sideEffects.put).lastCalledWith(updateFeatureFlags(featureFlags));
    });
  });

  test('should update the feature flags with nothing when the API fails', () => {
    const error = {
      message: 'Hey there',
    };
    sideEffects.call.mockRejectedValue(error);
    sideEffects.put.mockResolvedValue();
    return co(function* () {
      yield getFeatureFlags();
      expect(sideEffects.put).lastCalledWith(updateFeatureFlags({}));
    });
  });

  test('should fire off saga on FETCH_ALL_FEATURE_FLAGS action', () => {
    const featureFlagsSaga = require('../../../../../src/client/javascripts/sagas/feature-flags-saga').default;
    sideEffects.takeEvery.mockResolvedValue();
    return co(function* () {
      yield featureFlagsSaga(FETCH_FEATURE_FLAGS, getFeatureFlags);
      expect(sideEffects.takeEvery).lastCalledWith(FETCH_FEATURE_FLAGS, getFeatureFlags);
    });
  });
});
