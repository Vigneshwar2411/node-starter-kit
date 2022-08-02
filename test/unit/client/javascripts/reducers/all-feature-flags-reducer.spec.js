import allFeatureFlags from 'client/javascripts/reducers/all-feature-flags-reducer';
import { updateAllFeatureFlags } from 'client/javascripts/actions';

describe('All Feature Flags Reducer', () => {
  let state;

  describe('UPDATE_ALL_FEATURE_FLAGS', () => {
    beforeEach(() => {
      state = {};
    });

    test('should update the state with the current feature flags', () => {
      expect(allFeatureFlags(state, updateAllFeatureFlags({
        local: { flag: true },
        prod: { flag: false },
      }))).toEqual({
        local: { flag: true },
        prod: { flag: false },
      });
    });
  });

  describe('Without Initial State', () => {
    test('should return the current state', () => {
      expect(allFeatureFlags(undefined, updateAllFeatureFlags({
        local: { flag: true },
        prod: { flag: false },
      }))).toEqual({
        local: { flag: true },
        prod: { flag: false },
      });
    });
  });

  describe('Default State', () => {
    test('should return the current state', () => {
      expect(allFeatureFlags(state, { type: undefined })).toEqual(state);
    });
  });
});
