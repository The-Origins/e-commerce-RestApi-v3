module.exports = (req, res, next) =>
{
    res.recent = req.session.recent
    res.verificationCode = req.session.verificationCode
    next()
}