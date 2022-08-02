export const isFeatureEnabled = (state, flag) => state.featureFlags[flag];

export const getAllFeatureFlags = state => state.allFeatureFlags;

export const getLogs = state => state.logsQueue;

export const getLocation = state => (state.routing || {}).location;

export const getAuthorizationDetails = state => state.authReducer;
