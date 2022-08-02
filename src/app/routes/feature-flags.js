const featureFlagsRouter = require('express').Router();

const allFeatureFlags = require('../feature-flags').getAll();
const featureFlags = require('../feature-flags').get(process.env.NODE_ENV);

featureFlagsRouter.get('/', (req, res) => {
  if (req.query.all) {
    if (process.env.NODE_ENV !== 'production') {
      res.status(200).send(allFeatureFlags);
    }
    else {
      res.status(403).send();
    }
  }
  else {
    res.status(200).send(featureFlags);
  }
});

featureFlagsRouter.put('/update', (req, res) => {
  const { flag, value } = req.body;
  if (flag && value !== undefined) {
    featureFlags.setFlagValue(flag, value);
    return res.status(200).json({ message: `Successfully updated ${flag} with ${value} in ${process.env.NODE_ENV}`}).end();
  }
  if (!flag && value === undefined) {
    return res.status(400).json({ message: 'Missing flag and value from request' }).end();
  }
  if (!flag) {
    return res.status(400).json({ message: 'Missing flag from request' }).end();
  }
  return res.status(400).json({ message: 'Missing value from request' }).end();
});

module.exports = featureFlagsRouter;
