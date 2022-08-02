const _mergeWith = require('lodash/mergeWith');

module.exports.mergeIgnoringUndefined = (A, B) => _mergeWith({}, A, B, (a, b) => b === undefined ? a : undefined);

module.exports.parseJSON = (data) => {
  let json;
  try {
    json = JSON.parse(data);
  }
  catch(e) {
    json = {};
  }
  return json;
};

module.exports.isNotRootPath = ({ originalUrl }) => (
  originalUrl !== '/myApp'
);
