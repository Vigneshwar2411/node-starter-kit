module.exports = {
  appBaseURL: process.env.APP_HOSTNAME,
  clientKey: process.env.NATIONSTAR_API_CLIENT_API_KEY,
  clientAPIKey: process.env.MRCOOPER_API_CLIENT_API_KEY_VALUE,
  clientBaseURL: process.env.CUSTOMER_HOST,
  graylog: {
    host: process.env.GRAYLOG_HOST,
    port: process.env.GRAYLOG_PORT,
    facility: process.env.GRAYLOG_FACILITY
  },
  airbrake: {
    projectId: parseInt(process.env.AIRBRAKE_PROJECT_ID, 10),
    projectKey: process.env.AIRBRAKE_PROJECT_KEY
  },
  fakeEndPoint: {
    url: process.env.FAKE_ENDPOINT_URL,
    method: process.env.FAKE_ENDPOINT_METHOD,
    statusCode: process.env.FAKE_ENDPOINT_STATUS_CODE
  },
  newrelic: {
    appName: process.env.NEW_RELIC_APP_NAME,
    licenceKey: process.env.NEW_RELIC_LICENSE_KEY
  },
  logFlushWaitTime: process.env.LOG_FLUSH_WAIT_TIME,
  cdnUrl: '',
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  adfs: {
    clientID: process.env.ADFS_CLIENT_ID,
    redirectUrl: `${process.env.APP_HOSTNAME}/token`,
    clientSecret: process.env.ADFS_CLIENT_SECRET,
    resourceUrl: 'https://graph.microsoft.com'
  },
  authStrategy: 'azuread-openidconnect',
};
