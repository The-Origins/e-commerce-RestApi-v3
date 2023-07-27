require("dotenv").config();
module.exports = (req, res, next) => {

  if (req.session.verificationCode) {
    if (
      req.session.verificationCode.code &&
      req.session.verificationCode.createdAt
    ) {
      const maxAge = Number(process.env.VERIFICATION_CODE_MAXAGE);
      const codeDate = new Date(req.session.verificationCode.createdAt);
      const currentDate = new Date();

      //this deletes the code once it expires
      if (currentDate.getTime() - codeDate.getTime() > maxAge) {
        req.session.verificationCode = undefined;
      }
    }
  }
  next();
};
