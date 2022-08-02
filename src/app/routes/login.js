const loginRouter = require('express').Router();
const auth = require('../middleware/authenticator');
const config = require('../config');

loginRouter.get('/login', auth.authenticate(config.authStrategy, {
  resourceURL: config.adfs.resourceUrl,
  failureRedirect: '/login',
}));

loginRouter.post('/token', auth.authenticate(config.authStrategy, {
  failureRedirect: '/login',
}), (_, res) => {
  res.redirect('/');
});

module.exports = loginRouter;
