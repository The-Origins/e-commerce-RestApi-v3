module.exports = (req, res, next) => {
  if (!req.session.recent) {
    req.session.recent = [];
  }
  next();
};
