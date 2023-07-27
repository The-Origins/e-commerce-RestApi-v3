module.exports = (req, res, next) => {
  next(new Error(`Invalid username or password`));
};
