module.exports = (err, req, res, next) => {
  if (err) {
    res.code = res.code || 500;
    res.status(res.code).json({ success: false, data: [], message: err.message });
  }
  next();
};
