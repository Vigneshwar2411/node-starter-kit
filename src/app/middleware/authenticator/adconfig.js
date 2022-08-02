const { adfs } = require('../../config');

exports.creds = {
  identityMetadata: 'https://login.microsoftonline.com/7653af48-8d24-4c43-bbaa-b8547139c0f5/.well-known/openid-configuration',
  clientID: adfs.clientID,
  responseType: 'code id_token',
  responseMode: 'form_post',
  redirectUrl: adfs.redirectUrl,
  allowHttpForRedirectUrl: true,
  clientSecret: adfs.clientSecret,
  validateIssuer: true,
  scope: ['email', 'profile'],
};
