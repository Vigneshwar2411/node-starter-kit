import featureFlags from 'client/javascripts/reducers/feature-flags-reducer';
import { updateFeatureFlags } from 'client/javascripts/actions';

describe('Feature Flags Reducer', () => {
  let state;

  describe('UPDATE_FEATURE_FLAGS', () => {
    beforeEach(() => {
      state = {};
    });

    test('should update the state with the current feature flags', () => {
      expect(featureFlags(state, updateFeatureFlags({
        flag: true,
      }))).toEqual({
        flag: true,
      });
    });
  });

  describe('Without Initial State', () => {
    test('should return the current state', () => {
      expect(featureFlags(undefined, updateFeatureFlags({
        flag: true,
      }))).toEqual({
        flag: true,
      });
    });
  });

  describe('Default State', () => {
    test('should return the current state', () => {
      expect(featureFlags(undefined, { type: undefined })).toEqual(state);
    });
  });
});
