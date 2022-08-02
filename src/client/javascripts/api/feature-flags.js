import http from './http';

export const getFeatureFlags = () => http.get('/feature_flags').then(res => res.data);

export const getAllFeatureFlags = () => http.get('/feature_flags', {
  params: {
    all: true,
  },
}).then(res => res.data);
