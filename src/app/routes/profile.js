const profileRouter = require('express').Router();

const _get = require('lodash/get');

profileRouter.get('/me', async (req, res) => {
  if (_get(req, 'user.profile.displayName', null)) {
    return res.json({
      name: req.user.profile.displayName,
    }).end();
  }
  res.sendStatus(401);
});

module.exports = profileRouter;
