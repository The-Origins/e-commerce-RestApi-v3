module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.session.isVerified) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
};