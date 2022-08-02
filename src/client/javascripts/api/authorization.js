import http from './http';

export const getAuth = () => (
  http.get('/api/me').then(res => res.data)
);

export default getAuth;
