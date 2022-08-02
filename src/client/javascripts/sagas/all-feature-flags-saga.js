import { call, takeEvery, put } from 'redux-saga/effects';
import { FETCH_ALL_FEATURE_FLAGS } from '../actions/types';
import { getAllFeatureFlags as fetchAllFeatureFlags } from '../api/feature-flags';
import { updateAllFeatureFlags, logger } from '../actions';
import { LogTypes } from '../constants';
import { createLogDetails } from '../utils/create-log-details';

export const getAllFeatureFlags = function* () {
  try {
    const featureFlags = yield call(fetchAllFeatureFlags);
    yield put(updateAllFeatureFlags(featureFlags));
  } catch (error) {
    yield put(logger.error(createLogDetails('getAllFeatureFlags', LogTypes.SAGA, error)));
    yield put(updateAllFeatureFlags({}));
  }
};

export default function* allFeatureFlagsSaga() {
  yield takeEvery(FETCH_ALL_FEATURE_FLAGS, getAllFeatureFlags);
}
