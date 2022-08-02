'use strict';
// const Redis = process.env.NODE_ENV !== 'test' ? require('ioredis') : require('ioredis-mock');

const redis = require('redis');
const chalk = require('chalk');

const config = require('../../config');
const logger = require('../../utils/logger');

const nodeEnv = process.env.NODE_ENV;

const redisConfig = {
  host: config.redis.host,
  port: config.redis.port,
  ttl: 260,
  prefix: `your-app-${nodeEnv}-`,
  password: config.redis.password,
};

const client = redis.createClient(redisConfig);

client.on('error', () => {
  if (config.airbrake.projectId) {
    const airbrake = require('../../service/airbrake');
    airbrake.notify({error: 'error connecting to redis'});
  }
  logger.error('error connecting to redis');
  // eslint-disable-next-line no-console
  console.error(chalk.bold.red('Error connecting to redis'));
});

module.exports = client;
