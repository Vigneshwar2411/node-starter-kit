import { fork, all } from 'redux-saga/effects';
import featureFlagsSaga from './feature-flags-saga';
import allFeatureFlagsSaga from './all-feature-flags-saga';
import logsSaga from './logs-saga';
import authSaga from './auth-saga';

export default function* rootSaga() {
  yield all([
    fork(featureFlagsSaga),
    fork(allFeatureFlagsSaga),
    fork(logsSaga),
    fork(authSaga),
  ]);
}
