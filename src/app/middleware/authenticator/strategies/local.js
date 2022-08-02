const { Strategy } = require('passport');

const defaultUser = {
  oid: 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  upn: 'user@mrcooper.com',
  displayName: 'User',
  userId: 'user',
};

class LocalStrategy extends Strategy {
  constructor(options, verify) {
    super(options);
    this.name = 'local';
    this.passAuthentication = options.passAuthentication || true;
    this.userId = options.userId || defaultUser;
    this.verify = verify;
  }

  authenticate() {
    if (this.passAuthentication) {
      const user = this.userId;
      this.verify({}, {}, user, '', '', (err, resident) => {
        if (err) {
          this.fail(err);
        }
        else {
          const authUser = { ...resident };
          authUser.profile = user;
          authUser.accessToken = '';
          authUser.refreshToken = '';
          this.success(authUser);
        }
      });
    }
    else {
      this.fail('Unauthorized');
    }
  }
}

const strategy = (verifyFunction, config) => new LocalStrategy(config, verifyFunction);

module.exports = strategy;
