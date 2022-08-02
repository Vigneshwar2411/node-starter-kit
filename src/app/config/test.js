module.exports = {
  appBaseURL: 'http://localhost:8888',
  port: '8888',
  ports: {
    integrations: '9999',
  },
  clientAPIKey: 'e9cb1352-55c2-4884-abef-032a961f7e5e',
  clientBaseURL: 'http://localhost:9999',
  graylog: {},
  airbrake: {},
  fakeEndPoint: {
    url: '',
    method: '',
    statusCode: ''
  },
  newrelic: {
    appName: process.env.NEW_RELIC_APP_NAME,
    licenceKey: process.env.NEW_RELIC_LICENSE_KEY
  },
  cdnUrl: '',
  logFlushWaitTime: 6000,
  redis: {
    port: 6379,
    host: '127.0.0.1',
  },
  skipLogging: true,
  authStrategy: 'local'
};
