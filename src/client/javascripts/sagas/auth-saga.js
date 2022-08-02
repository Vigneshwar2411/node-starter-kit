import { call, takeEvery, put } from 'redux-saga/effects';
import { AUTH_START } from '../actions/types';
import { getAuth } from '../api/authorization';
import { authSuccess, authFail, logger } from '../actions';
import { LogTypes } from '../constants';
import { createLogDetails } from '../utils/create-log-details';

export const getAuthStatus = function* () {
  try {
    const profile = yield call(getAuth);
    yield put(authSuccess(profile));
  } catch (error) {
    yield put(logger.error(createLogDetails('getAuthStatus', LogTypes.API_ERROR, error)));
    yield put(authFail());
  }
};

export default function* authSaga() {
  yield takeEvery(AUTH_START, getAuthStatus);
}
