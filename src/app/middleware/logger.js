const winston = require('winston');
const WinstonGraylog2 = require('winston-graylog2');
const expressWinston = require('express-winston');
const os = require('os');
const config = require('../config');

const transports = [];

const options = {
  graylog: {
    servers: [ {
      host: config.graylog.host,
      port: config.graylog.port
    } ],
    hostname: os.hostname(),
    facility: config.graylog.facility,
    bufferSize: 1400
  }
};

if (config.graylog.host) {
  transports.push(new(WinstonGraylog2)(options));
}
else {
  transports.push(new winston.transports.Console({
    json: false,
    colorize: true,
    silent: config.skipLogging
  }));
}

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

module.exports.requestLogger = expressWinston.logger({
  transports,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  ignoreRoute: (req) => /(\.css|\.js|\.svg|\.ttf|\.png|\/logs)/.test(req.url),
  responseFilter: (res, propName) => {
    if (propName ==='body' && (/(2\d\d)/.test(res.statusCode))) {
      return undefined;
    }
    return res[propName];
  },
  statusLevels: {
    success: 'info',
    warn: 'error',
    error: 'error'
  },
  dynamicMeta: (req, res) => {
    return {
      subject: 'request logger',
      sessionId: req.context.sessionId,
      applicationId: req.context.applicationId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
    };
  }
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports,
  baseMeta: {
    trace: undefined,
    process: undefined,
    os: undefined
  },
  dynamicMeta: (req, res, err) => {
    if(err.hasBeenLogged){
      err.hasBeenLogged = undefined;
    }
    return {
      subject: 'error logger',
      sessionId: req.context.sessionId,
      applicationId: req.context.applicationId,
      method: req.method,
      url: req.originalUrl,
      error: err
    };
  },
  msg: '{{err.message}}; {{req.method}} {{req.originalUrl}}'
});
