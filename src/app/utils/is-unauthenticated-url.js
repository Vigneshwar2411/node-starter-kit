const config = require('../config');

const unauthenticatedURLs = [
  `${config.appRoute}/view_flags`,
  `${config.appRoute}/feature_flags`,
  `${config.appRoute}/feature_flags/update`,
  `${config.appRoute}/login`,
  `${config.appRoute}/token`
];

const isUnauthenticatedURL = (url) => unauthenticatedURLs.indexOf(url) > -1;

module.exports = {
  isUnauthenticatedURL,
  unauthenticatedURLs
};
