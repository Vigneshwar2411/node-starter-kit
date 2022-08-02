module.exports = (req, res, next) => {
  res.header('Cache-Control', 'must-revalidate');
  res.header('Expires', '-1');
  next();
};