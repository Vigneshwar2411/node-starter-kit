require('./newrelic');
const chalk = require('chalk');
const app = require('./src/app/app');
const config = require('./src/app/config');


const server = app.listen(config.port);
console.log(chalk.bold.green(`==> 💻 SERVER STARTED ON PORT ${config.port} 💻 <==`));

const shutdown = () => {
  console.log(chalk.bold.red('==> ⛔️ SHUTTING DOWN SERVER ⛔️ <=='));
  server.close();
};

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
