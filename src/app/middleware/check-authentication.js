const logger = require('../utils/logger');
const config = require('../config');
const { isUnauthenticatedURL } = require('../utils/is-unauthenticated-url');
const { isNotRootPath } = require('../utils/helpers');

const checkAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  return handleUnauthenticated(request, response, next);
};

const handleUnauthenticated = (request, response, next) => {
  if (isUnauthenticatedURL(request.path)) {
    return next();
  }
  
  const message = `Not Authorized: ${request.method} ${request.originalUrl}`;
  const metaData = {
    method: request.method,
    url: request.originalUrl
  };
  
  if (isNotRootPath(request)) {
    logger.error(message, metaData, request.context);
    
    if (config.airbrake.projectId) {
      const airbrake = require('../service/airbrake');
  
      const airbrakeData = {
        params: {
          method: request.method,
          url: request.originalUrl,
          userName: request.user && request.user.profile && request.user.profile.displayName || 'Unknown User',
          message,
        }
      };
  
      airbrake.notify(JSON.stringify(airbrakeData));
    }
  }

  return response.redirect(config.redirectURL);
};

module.exports = checkAuthentication;