import {
  UPDATE_FEATURE_FLAGS,
  FETCH_FEATURE_FLAGS,
  UPDATE_ALL_FEATURE_FLAGS,
  FETCH_ALL_FEATURE_FLAGS,
} from './types';

export const updateFeatureFlags = featureFlags => ({ type: UPDATE_FEATURE_FLAGS, featureFlags });

export const fetchFeatureFlags = () => ({ type: FETCH_FEATURE_FLAGS });

export const updateAllFeatureFlags = featureFlags => ({
  type: UPDATE_ALL_FEATURE_FLAGS,
  featureFlags,
});

export const fetchAllFeatureFlags = () => ({ type: FETCH_ALL_FEATURE_FLAGS });
