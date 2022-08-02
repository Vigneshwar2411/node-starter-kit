const DateUtils = require('../../utils/date-utils');
const config = require('../../config');

module.exports.axiosInterceptor = (axios) => {
  /* istanbul ignore next */
  if (config.fakeEndPoint) {
    axios.interceptors.request.use(request => {
      if (request.url === config.fakeEndPoint.url && request.method === config.fakeEndPoint.method) {
        const error = new Error();
        error.status = config.fakeEndPoint.statusCode || 500;
        error.response = 'fake error';
        return Promise.reject(error);
      }

      return request;
    });
  }
};

module.exports.addResponseTime = (axios) => {
  axios.interceptors.request.use(config => {
    config.startTime = DateUtils.now().getTime();
    return config;
  });

  axios.interceptors.response.use(response => {
    const startTime = new Date(response.config.startTime);
    const endTime = DateUtils.now();
    response.timeTaken = DateUtils.getTimeElapsed(startTime, endTime);
    return response;
  });
};