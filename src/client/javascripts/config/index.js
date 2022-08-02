/* eslint-disable no-underscore-dangle */
// Do not use let here; it breaks uglify

const obj = {};
try {
  obj.config = JSON.parse(Buffer.from(window.__CONFIG__, 'base64').toString('utf-8'));
} catch (error) {
  /* istanbul ignore next */
  obj.config = {};
}

delete window.__CONFIG__;

export default obj.config;
