module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin && req.session.isVerified) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
};
