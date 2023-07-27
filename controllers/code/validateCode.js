const utils = require("../../lib/utils");

module.exports = (req, res, next) => {
  /*req.body syntax:
    {
        code:Number
    }
     */

  if (req.body.code) {

    //check if code was sent to the session 
    if (
      req.session.verificationCode.code &&
      req.session.verificationCode.createdAt
    ) {
      //get current date and the date that the code was created
      const currentDate = new Date();
      const codeDate = new Date(req.session.verificationCode.createdAt);

      //get code max age
      //put in .env for more security
      const maxAge = Number(process.env.VERIFICATION_CODE_MAXAGE);

      //validate the code and it's age
      if (
        req.isAuthenticated() &&
        currentDate.getTime() - codeDate.getTime() <= maxAge &&
        Number(req.body.code) === Number(req.session.verificationCode.code)
      ) {

        //verify the session
        req.session.isVerified = true;
        req.session.verificationCode = undefined;

        res.json({success:true, data:{}, message:`verified session`})
      } else {
        next(new Error(`Unauthorized`));
      }
    } else {
      next(new Error(`Unauthorized`));
    }
  } else {
    return next(new Error(`Invalid input`));
  }
};
