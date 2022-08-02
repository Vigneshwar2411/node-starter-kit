module.exports = {
  appBaseURL: 'http://localhost',
  port: '3020',
  clientKey: 'X-IBM-Client-Id',
  clientAPIKey: undefined,
  clientBaseURL: undefined,
  graylog: {
    host: undefined,
    port: undefined,
    facility: undefined
  },
  airbrake: {
    projectId: undefined,
    projectKey: undefined
  },
  redirectURL: '/myApp/login',
  fakeEndPoint: {
    url: undefined,
    method: undefined,
    statusCode: undefined
  },
  newrelic: {
    appName: undefined,
    licenceKey: undefined
  },
  cdnUrl: undefined,
  logFlushWaitTime: 6000,
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: null,
  },
  skipLogging: false,
  appRoute: '/myApp',
  useApiPrefix: false,
  adfs: {
    clientID: 'replace_with_your_client_id',
    redirectUrl: 'replace_with_redirect_url',
    clientSecret: 'replace_with_your_client_secret',
    resourceUrl: 'https://graph.microsoft.com'
  },
  authStrategy: undefined
};
