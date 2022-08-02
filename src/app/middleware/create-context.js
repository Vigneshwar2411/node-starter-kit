module.exports = (req, res, next) => {
  req.context = {
    subject: 'server'
  };
  next();
};