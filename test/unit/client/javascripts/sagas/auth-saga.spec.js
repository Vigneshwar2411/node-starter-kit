/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
import co from 'co';
import * as sideEffects from 'redux-saga/effects';
import { getAuth } from 'client/javascripts/api/authorization';
import { authSuccess, authFail } from 'client/javascripts/actions';
import { AUTH_START } from 'client/javascripts/actions/types';

jest.mock('redux-saga/effects');

describe('Auth Saga', () => {
  let getAuthStatus;

  beforeEach(() => {
    sideEffects.call.mockClear();
    sideEffects.put.mockClear();
    sideEffects.takeEvery.mockClear();
    getAuthStatus = require('../../../../../src/client/javascripts/sagas/auth-saga').getAuthStatus;
  });

  test('should update the auth success status from the API', () => {
    sideEffects.call.mockResolvedValue({ name: 'John Doe' });
    sideEffects.put.mockResolvedValue();
    return co(function* () {
      yield getAuthStatus();
      expect(sideEffects.call).lastCalledWith(getAuth);
      expect(sideEffects.put).lastCalledWith(authSuccess({ name: 'John Doe' }));
    });
  });

  test('should update the auth fail status API fails', () => {
    const error = {
      message: 'Hey there',
    };
    sideEffects.call.mockRejectedValue(error);
    sideEffects.put.mockResolvedValue();
    return co(function* () {
      yield getAuthStatus();
      expect(sideEffects.put).lastCalledWith(authFail({}));
    });
  });

  test('should fire off saga on AUTH_START action', () => {
    const authSaga = require('../../../../../src/client/javascripts/sagas/auth-saga').default;
    sideEffects.takeEvery.mockResolvedValue();
    return co(function* () {
      yield authSaga(AUTH_START, getAuthStatus);
      expect(sideEffects.takeEvery).lastCalledWith(AUTH_START, getAuthStatus);
    });
  });
});
