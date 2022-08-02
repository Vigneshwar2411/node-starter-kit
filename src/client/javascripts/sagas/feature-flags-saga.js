import { call, takeEvery, put } from 'redux-saga/effects';
import { FETCH_FEATURE_FLAGS } from '../actions/types';
import { getFeatureFlags as fetchFeatureFlags } from '../api/feature-flags';
import { updateFeatureFlags, logger } from '../actions';
import { LogTypes } from '../constants';
import { createLogDetails } from '../utils/create-log-details';

export const getFeatureFlags = function* () {
  try {
    const featureFlags = yield call(fetchFeatureFlags);
    yield put(updateFeatureFlags(featureFlags));
  } catch (error) {
    yield put(logger.error(createLogDetails('getFeatureFlags', LogTypes.SAGA, error)));
    yield put(updateFeatureFlags({}));
  }
};

export default function* featureFlagsSaga() {
  yield takeEvery(FETCH_FEATURE_FLAGS, getFeatureFlags);
}
