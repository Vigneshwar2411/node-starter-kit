const AirbrakeClient = require('airbrake-js');
const config = require('../config');

const airbrake = new AirbrakeClient({
  projectId: config.airbrake.projectId,
  projectKey: config.airbrake.projectKey
});

airbrake.addFilter((notice) => {
  if (notice.session) {
    notice.session =  Object.assign({}, notice.session, {oktaUserId: undefined, authenticationToken: undefined});
  }
  if(process.env.NODE_ENV === 'local' && !config.skipLogging) {
    console.log('TO AIRBRAKE:', notice); // eslint-disable-line no-console
  }
  return notice;
});

module.exports = airbrake;
