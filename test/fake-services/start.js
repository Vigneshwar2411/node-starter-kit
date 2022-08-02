/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const axios = require('axios');
const chalk = require('chalk');
const config = require('../../src/app/config');

const isPortAvailable = port => axios.get('/', { baseURL: `http://localhost:${port}` })
  .then(() => false)
  .catch(err => err.code === 'ECONNREFUSED');

const services = {
  integrations: {
    server: null,
    port: config.ports.integrations,
  },
};

const startServer = (name, port) => isPortAvailable(port).then((isAvailable) => {
  if (isAvailable) {
    const server = require(`./${name}`).listen(port);
    console.log(chalk.bold.green(`==> 💻 FAKE ${name.toUpperCase()} SERVER STARTED ON ${port} 💻 <==`));
    return server;
  }
  return null;
});

const shutdown = async () => {
  await Promise.all(Object.keys(services).map(async (service) => {
    console.log(chalk.bold.red(`==> ⛔️ SHUTTING FAKE ${service.toUpperCase()} SERVER ⛔️ <==`));
    return services[service].server.close();
  }));
};

Object.keys(services).forEach(async (service) => {
  services[service].server = await startServer(service, services[service].port);
});

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
