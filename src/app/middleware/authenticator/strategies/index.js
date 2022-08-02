const passport = require('passport');
const local = require('./local');
const adfs = require('./adfs');

const strategies = {
  local,
  adfs,
};

const callback = (verifyFunction, currentStrategy, adfsConfig) => {
  const strategy = strategies[currentStrategy] || adfs;
  passport.use(strategy(verifyFunction, adfsConfig));
};

module.exports = callback;