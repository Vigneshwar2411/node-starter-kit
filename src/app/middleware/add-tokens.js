const config = require('../config');

const clientConfig = {
  cdnUrl: config.cdnUrl,
  logFlushWaitTime: config.logFlushWaitTime,
  env: process.env.NODE_ENV,
  appBaseURL: config.appBaseURL,
  appRoute: config.appRoute
};

module.exports = (request, response, next) => {
  const tokens = {
    cdnUrl: config.cdnUrl,
    appRoute: config.appRoute, //Config for layouts
    config: Buffer.from(JSON.stringify(clientConfig)).toString('BASE64')
  };

  if (request.session) {
    tokens.hasSession = true;
  }

  request.tokens = tokens;

  return next();
};
