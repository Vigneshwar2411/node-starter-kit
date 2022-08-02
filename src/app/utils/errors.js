module.exports.badRequest = (message) => {
  const error = new Error(message);
  error.status = 400;
  return error;
};

module.exports.unAuthorized = (message) => {
  const msg = message || 'Not Authorized';
  const error = new Error(msg);
  error.status = 401;
  return error;
};

module.exports.forbidden = () => {
  const error = new Error('Forbidden');
  error.status = 403;
  return error;
};