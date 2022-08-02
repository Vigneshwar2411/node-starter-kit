import * as actions from 'client/javascripts/actions/feature-flags';

describe('actions/feature-flags', () => {
  test('updateFeatureFlags action', () => {
    expect(actions.updateFeatureFlags([])).toStrictEqual({
      type: 'update_feature_flags',
      featureFlags: [],
    });
  });

  test('fetchFeatureFlags action', () => {
    expect(actions.fetchFeatureFlags()).toStrictEqual({
      type: 'fetch_feature_flags',
    });
  });

  test('updateAllFeatureFlags action', () => {
    expect(actions.updateAllFeatureFlags([])).toStrictEqual({
      type: 'update_all_feature_flags',
      featureFlags: [],
    });
  });

  test('fetchAllFeatureFlags action', () => {
    expect(actions.fetchAllFeatureFlags()).toStrictEqual({
      type: 'fetch_all_feature_flags',
    });
  });
});
