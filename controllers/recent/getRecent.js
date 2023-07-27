module.exports = (req, res) => {
  res.json({
    success: true,
    data: req.session.recent,
    message: `retrieved recent session activity`,
  });
};
