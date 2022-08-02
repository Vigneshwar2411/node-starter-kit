import authReducer from 'client/javascripts/reducers/auth-reducer';
import { authStart, authSuccess, authFail } from 'client/javascripts/actions';

describe('Auth Reducer', () => {
  let state;

  describe('AUTH_START', () => {
    beforeEach(() => {
      state = {
        authorized: false,
        isAuthorizing: true,
        profile: {
          name: 'John Doe',
        },
      };
    });

    test('should update the state for auth start', () => {
      expect(authReducer(state, authStart())).toStrictEqual({
        isAuthorizing: true,
        authorized: false,
        profile: {
          name: '',
        },
      });
    });
  });

  describe('AUTH_SUCCESS', () => {
    beforeEach(() => {
      state = {
        authorized: false,
        isAuthorizing: true,
        profile: {
          name: '',
        },
      };
    });

    test('should update the state for auth success', () => {
      expect(authReducer(state, authSuccess({ name: 'John Doe' }))).toStrictEqual({
        isAuthorizing: false,
        authorized: true,
        profile: {
          name: 'John Doe',
        },
      });
    });
  });

  describe('AUTH_FAIL', () => {
    beforeEach(() => {
      state = {
        authorized: false,
        isAuthorizing: true,
        profile: {
          name: '',
        },
      };
    });

    test('should update the state for auth fail', () => {
      expect(authReducer(state, authFail())).toStrictEqual({
        isAuthorizing: false,
        authorized: false,
        profile: {
          name: '',
        },
      });
    });
  });

  describe('Without Initial State', () => {
    test('should return the current state', () => {
      expect(authReducer(undefined, authSuccess({ name: 'John Doe' }))).toStrictEqual({
        isAuthorizing: false,
        authorized: true,
        profile: {
          name: 'John Doe',
        },
      });
    });
  });

  describe('Default State', () => {
    test('should return the current state', () => {
      expect(authReducer(undefined, { type: undefined })).toStrictEqual({
        isAuthorizing: true,
        authorized: false,
        profile: {
          name: '',
        },
      });
    });
  });
});
