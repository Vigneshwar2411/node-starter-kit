const loggerRouter = require('express').Router();
const _assign = require('lodash/assign');
const _get = require('lodash/get');

const config = require('../config');

const logger = require('../utils/logger');

loggerRouter.post('/logs', (req, res) => {
  _assign(req.context);
  req.body.logs.forEach((logDetails) => {
    const { message, datetime, logLevel, ...remainingDetails } = logDetails;
    const url = _get(logDetails, 'error.config.url', undefined);
    
    let logMessage = message;
    if (url) {
      logMessage += `, URL: ${url}`;
    }
    const metaData = { ...remainingDetails, subject: 'frontend', timestamp: datetime };
    
    if (logLevel === 'error') {
      logger.error(logMessage, metaData, req.context);
      
      if (config.airbrake.projectId) {
        const airbrake = require('../service/airbrake');
        airbrake.notify({
          error: logMessage,
          params: { customerId: req.session.customerId, metaData },
          session: req.session
        });
      }
    }
    else {
      logger.info(logMessage, metaData, req.context);
    }
  });

  res.status(204).send();
});

module.exports = loggerRouter;
