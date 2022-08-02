import * as selectors from 'client/javascripts/utils/redux-selectors';

describe('Redux Selectors Util', () => {
  describe('Logs', () => {
    test('should select logsQueue', () => {
      const state = {
        logsQueue: [{ anyKey: 'howdy!' }],
      };
      expect(selectors.getLogs(state)).toEqual(state.logsQueue);
    });
  });

  describe('Location', () => {
    test('should select location', () => {
      const state = {
        routing: {
          location: {
            pathname: 'originations/overview',
            search: '',
            hash: '',
          },
        },
      };
      expect(selectors.getLocation(state)).toEqual(state.routing.location);
    });

    test('should return empty obj if routing is undefined', () => {
      const state = {};
      expect(selectors.getLocation(state)).toEqual(undefined);
    });
  });

  describe('Feature Flags', () => {
    test('should select whether feature is enabled', () => {
      const flag = 'showComponent';
      const state = {
        featureFlags: {
          showComponent: true,
        },
      };
      expect(selectors.isFeatureEnabled(state, flag)).toEqual(
        state.featureFlags.showComponent,
      );
    });

    test('should select all feature flags', () => {
      const state = {
        allFeatureFlags: {
          local: {},
          dev: {},
          qa: {},
          production: {},
        },
      };
      expect(selectors.getAllFeatureFlags(state)).toEqual(state.allFeatureFlags);
    });
  });

  describe('Auth', () => {
    test('should get authorization reducer details from state', () => {
      const state = {
        authReducer: {
          authorized: true,
          isAuthorizing: false,
          profile: {
            name: 'John Doe',
          },
        },
      };
      expect(selectors.getAuthorizationDetails(state)).toStrictEqual({
        authorized: true,
        isAuthorizing: false,
        profile: {
          name: 'John Doe',
        },
      });
    });
  });
});
