const winston = require('winston');
const WinstonGraylog2 = require('winston-graylog2');
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

/* istanbul ignore next */
if (config.graylog.host) {
  transports.push(new(WinstonGraylog2)(options));
}
else {
  transports.push(new winston.transports.Console({
    json: true,
    colorize: true,
    silent: config.skipLogging
  }));
}

const winstonLogger = new (winston.Logger)({
  transports
});

const createMetaData = (metaData, context) => {
  const contextMetaData = context ? {
    subject: context.subject,
    sessionId: context.sessionId,
    applicationId: context.applicationId
  } : {};

  return Object.assign({}, contextMetaData, metaData);
};

const info = (message, metaData, context) => winstonLogger.info(message, createMetaData(metaData, context));

const warn = (message, metaData, context) => winstonLogger.warn(message, createMetaData(metaData, context));

const error = (message, metaData, context) => {
  const newMetaData = metaData && metaData.error && metaData.error.stack ?  Object.assign({}, metaData, {stackTrace: metaData.error.stack}) : metaData;
  winstonLogger.error(message, createMetaData(newMetaData, context));
};

const log = (level, message, metaData, context) => {
  switch(level) {
    case 'info':
      info(message, metaData, context);
      break;
    case 'warn':
      warn(message, metaData, context);
      break;
    case 'error':
      error(message, metaData, context);
      break;
    default:
      info(message, metaData, context);
  }
};

module.exports = {
  info,
  warn,
  error,
  log
};