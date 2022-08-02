const BaseConfig = require('./base');

class QaConfig extends BaseConfig {
  constructor() {
    super();
    this.authFail = true;
  }
}

module.exports = QaConfig;
