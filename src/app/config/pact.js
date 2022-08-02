module.exports = {
  appBaseURL: 'http://localhost:8888',
  ports: {
    integrations: '9999',
  },
  port: '8888',
  clientAPIKey: 'e9cb1352-55c2-4884-abef-032a961f7e5e',
  clientBaseURL: 'http://localhost:9999/',
  defaultBrandName: 'NSM',
  graylog: {},
  airbrake: {},
  fakeEndPoint: {
    url: '',
    method: ''
  },
  newrelic: {
    appName: process.env.NEW_RELIC_APP_NAME,
    licenceKey: process.env.NEW_RELIC_LICENSE_KEY
  },
  skipLogging: true,
  cdnUrl: 'http://localhost:8888',
  authStrategy: 'local'
};
