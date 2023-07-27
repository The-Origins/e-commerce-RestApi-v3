module.exports = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.json({ success: true, data: {}, message: `successfully logged out` });
  });
};
