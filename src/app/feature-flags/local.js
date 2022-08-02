const BaseConfig = require('./base');

class LocalConfig extends BaseConfig {
  constructor() {
    super();
    this.sessionTimeout = false;
  }
}

module.exports = LocalConfig;
