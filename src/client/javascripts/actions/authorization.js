import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from './types';

export const authStart = () => ({ type: AUTH_START });

export const authSuccess = profile => ({ type: AUTH_SUCCESS, profile });

export const authFail = () => ({ type: AUTH_FAIL });
