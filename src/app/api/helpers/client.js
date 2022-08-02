const Joi = require('joi');
const humps = require('humps');
const _defaults = require('lodash/defaults');
const https = require('https');
const util = require('util');

const { axiosInterceptor, addResponseTime } = require('./axios-interceptor');

const logger = require('../../utils/logger');
const config = require('../../config');


const agent = new https.Agent({
  rejectUnauthorized: false
});

const axios = require('axios').create({
  httpsAgent: agent,
  maxContentLength: 1024 * 1024 * 40,
});

axiosInterceptor(axios);
addResponseTime(axios);

const internals = {};

const get = (url, options, context) => {
  if (!url) {
    throw new Error('ValidationError');
  }
  return doHttpRequest(url, 'get', options || {}, null, context);
};

const post = (url, body, options, context) => {
  if (!url) {
    throw new Error('ValidationError');
  }
  return doHttpRequest(url, 'post', options || {}, body, context);
};

const patch = (url, body, options, context) => {
  if (!url) {
    throw new Error('ValidationError');
  }
  return doHttpRequest(url, 'patch', options || {}, body, context);
};

const put = (url, body, options, context) => {
  if (!url) {
    throw new Error('ValidationError');
  }
  return doHttpRequest(url, 'put', options || {}, body, context);
};

const createApiLogMessage = (requestDetails) => `${requestDetails.method ? requestDetails.method.toUpperCase() : ''} ${requestDetails.url}`;

const createApiLogMetadata = (requestDetails, responseDetails) => {
  return {
    subject: 'outgoing api call',
    statusCode: responseDetails.status,
    method: requestDetails.method,
    url: requestDetails.url,
    responseTime: responseDetails.timeTaken,
    requestHeaders: requestDetails.headers ? util.inspect(requestDetails.headers) : undefined,
    responseHeaders: responseDetails.headers ? util.inspect(responseDetails.headers) : undefined,
    params: requestDetails.params ? util.inspect(requestDetails.params) : undefined,
    responseBody: util.inspect(responseDetails.data),
    requestBody: util.inspect(requestDetails.data)
  };
};

const doHttpRequest = (url, method, options, body, context) => (
  new Promise((resolve, reject) => {
    const validation = Joi.validate(options, internals.postSchema, {allowUnknown: true});
    if (validation.error) {
      return reject(validation.error);
    }

    const requestDetails = {
      url,
      method,
      params: options.params,
      headers: getHeaders(options.headers)
    };

    if (options.responseType){
      requestDetails.responseType = options.responseType;
    }

    if (body) {
      requestDetails.data = humps.decamelizeKeys(body, { separator: '_' });
    }

    axios(requestDetails)
      .then(response => {
        logger.info(`API RESPONSE: ${createApiLogMessage(requestDetails)}`, createApiLogMetadata(requestDetails, response), context);

        /* istanbul ignore next */
        if (options.responseType === 'stream') {
          resolve(response.data);
        }
        else {
          resolve(humps.camelizeKeys(response.data));
        }
      })
      .catch((err) => {
        err.config = undefined;
        err.request = undefined;
        let metaData = {};
        if (err.response) {
          metaData = createApiLogMetadata(requestDetails, err.response);
          metaData.stackTrace = err.stack;
          logger.error(`API ERROR: ${createApiLogMessage(requestDetails)}`, metaData, context);

          if (typeof err.response === 'object') {
            err.response.config = undefined;
            err.response.request = undefined;
          }
        }
        else {
          metaData = Object.assign(createApiLogMetadata(requestDetails, {}), { error: err });
          logger.error(`API ERROR: ${createApiLogMessage(requestDetails)}`, metaData, context);
        }

        /* istanbul ignore next */
        if (config.airbrake.projectId) {
          const airbrake = require('../../service/airbrake');
          airbrake.notify(JSON.stringify({
            error: metaData,
            params: requestDetails.params,
            context,
          }));
        }

        err.message = `${err.message}; happened for ${requestDetails.method.toUpperCase()} ${requestDetails.url}`;
        err.hasBeenLogged = true;

        reject(err);
      });
  })
);

const getHeaders = headers => (
  _defaults(headers, {
    'content-type': 'application/json'
  })
);

internals.postSchema =  Joi.object().keys({
  headers: Joi.object()
});

internals.getSchema =  Joi.object().keys({
  headers: Joi.object()
});

module.exports = {
  get,
  post,
  patch,
  put,
  getHeaders,
  createApiLogMetadata,
  createApiLogMessage
};
