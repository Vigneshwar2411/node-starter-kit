const config = require('../../src/app/config');
const integrations = require('./integrations');

let integrationsServer;

module.exports = {
  integrations,
  listen: () => {
    integrationsServer = integrations.listen(config.ports.integrations);
  },
  close: () => {
    integrationsServer.close();
  },
};
