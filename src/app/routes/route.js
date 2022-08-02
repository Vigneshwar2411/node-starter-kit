const router = require('express').Router();

const featureFlags = require('./feature-flags');
const logger = require('./logger');
const login = require('./login');
const profile = require('./profile');

router.use('/', login);
router.use('/feature_flags', featureFlags);
router.use('/', logger);
router.use('/api', profile);

module.exports = router;
