const passport = require('passport');
const strategies = require('./strategies');
const adfsConfig = require('./adconfig');
const config = require('../../config');

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((id, done) => done(null, id));

const verify = (iss, sub, profile, accessToken, refreshToken, done) => {
  done(null, {
    profile,
    accessToken,
    refreshToken,
  });
};

strategies(verify, config.authStrategy, adfsConfig);

module.exports = passport;