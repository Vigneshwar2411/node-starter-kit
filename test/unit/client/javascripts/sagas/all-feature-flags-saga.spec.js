/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
import { getAllFeatureFlags as fetchAllFeatureFlags } from 'client/javascripts/api/feature-flags';
import { updateAllFeatureFlags } from 'client/javascripts/actions';
import * as sideEffects from 'redux-saga/effects';
import co from 'co';
import { FETCH_ALL_FEATURE_FLAGS } from 'client/javascripts/actions/types';

jest.mock('redux-saga/effects');

describe('All Feature Flags Saga', () => {
  let getAllFeatureFlags;
  const featureFlags = [{
    shouldShowFirstComponent: true,
    shouldShowSecondComponent: false,
  }];

  beforeEach(() => {
    sideEffects.call.mockClear();
    sideEffects.put.mockClear();
    sideEffects.takeEvery.mockClear();
    getAllFeatureFlags = require('../../../../../src/client/javascripts/sagas/all-feature-flags-saga').getAllFeatureFlags;
  });

  test('should update the feature flags from the API', () => {
    sideEffects.call.mockResolvedValue(featureFlags);
    sideEffects.put.mockResolvedValue();
    return co(function* () {
      yield getAllFeatureFlags();
      expect(sideEffects.call).lastCalledWith(fetchAllFeatureFlags);
      expect(sideEffects.put).lastCalledWith(updateAllFeatureFlags(featureFlags));
    });
  });

  test('should update the feature flags with nothing when the API fails', () => {
    const error = {
      message: 'Hey there',
    };
    sideEffects.call.mockRejectedValue(error);
    sideEffects.put.mockResolvedValue();
    return co(function* () {
      yield getAllFeatureFlags();
      expect(sideEffects.put).lastCalledWith(updateAllFeatureFlags({}));
    });
  });

  test('should fire off saga on FETCH_ALL_FEATURE_FLAGS action', () => {
    const allFeatureFlagsSaga = require('../../../../../src/client/javascripts/sagas/all-feature-flags-saga').default;
    sideEffects.takeEvery.mockResolvedValue();
    return co(function* () {
      yield allFeatureFlagsSaga(FETCH_ALL_FEATURE_FLAGS, getAllFeatureFlags);
      expect(sideEffects.takeEvery).lastCalledWith(FETCH_ALL_FEATURE_FLAGS, getAllFeatureFlags);
    });
  });
});
