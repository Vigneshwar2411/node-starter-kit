const { OIDCStrategy } = require('passport-azure-ad');
const isEmpty = require('lodash/isEmpty');
const local = require('./local');


const strategy = (verifyFunction, adfsConfig) => {
  if (isEmpty(adfsConfig)) return local;
  const azureOptions = {
    redirectUrl: adfsConfig.creds.redirectUrl,
    clientID: adfsConfig.creds.clientID,
    clientSecret: adfsConfig.creds.clientSecret,
    identityMetadata: adfsConfig.creds.identityMetadata,
    allowHttpForRedirectUrl: adfsConfig.creds.allowHttpForRedirectUrl,
    responseType: adfsConfig.creds.responseType,
    validateIssuer: adfsConfig.creds.validateIssuer,
    responseMode: adfsConfig.creds.responseMode,
    scope: adfsConfig.creds.scope,
  };
  return new OIDCStrategy(azureOptions, verifyFunction);
};

module.exports = strategy;
