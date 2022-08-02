class BaseConfig {
  constructor() {
    this.sessionTimeout = true;
  }

  setFlagValue(flag, value) {
    this[flag] = value;
  }
}

module.exports = BaseConfig;
