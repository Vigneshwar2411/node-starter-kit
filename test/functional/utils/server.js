/* eslint-disable no-console */
const chalk = require('chalk');
const config = require('../../../src/app/config');
const app = require('../../../src/app/app');
const fakeService = require('../../fake-services');

class Server {
  constructor() {
    this.server = null;
    this.stop = this.stop.bind(this);
    this.start = this.start.bind(this);
  }

  start() {
    fakeService.listen();
    console.info(chalk.green(`FAKE SERVICE STARTED ON ${config.ports.integrations}`));
    this.server = app.listen(config.port);
    console.info(chalk.green(`APP SERVER STARTED ON ${config.port}`));
  }

  stop() {
    fakeService.close();
    console.info(chalk.green('FAKE SERVICE CLOSED'));
    return new Promise((resolve) => {
      this.server.close(() => {
        console.info(chalk.green('APP SERVER CLOSED'));
        resolve();
      });
    });
  }
}

module.exports = new Server();
