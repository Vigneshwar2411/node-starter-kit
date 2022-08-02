import http from './http';
import * as dateUtils from '../utils/date-utils';

const ENDPOINT = '/logs';

export const log = /* istanbul ignore next */ (csrf, message) => http.post(ENDPOINT, {
  logs: [{
    message,
    logLevel: 'info',
    datetime: dateUtils.now().toISOString(),
  }],
}, {
  headers: {
    'X-XSRF-TOKEN': csrf,
    'Content-Type': 'application/json',
  },
}).then(res => res.status);

export const logError = /* istanbul ignore next */ (csrf, metaData) => {
  const logDetails = Object.assign({}, metaData, { logLevel: 'error', datetime: dateUtils.now().toISOString() });
  return http.post(ENDPOINT, {
    logs: [logDetails],
  }, {
    headers: {
      'X-XSRF-TOKEN': csrf,
      'Content-Type': 'application/json',
    },
  }).then(res => res.status);
};

export const logAll = /* istanbul ignore next */ (csrf, logs) => http.post(ENDPOINT, { logs }, {
  headers: {
    'X-XSRF-TOKEN': csrf,
    'Content-Type': 'application/json',
  },
}).then(res => res.status);
