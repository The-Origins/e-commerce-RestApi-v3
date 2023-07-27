const utils = require("../../lib/utils");

module.exports = (req, res, next) => {
  /*if the user is not logged in to actually send the verification code to their email you must pass in their email in the request body,
  for now that's not necessary but once the email logic is added it will be mandatory.
  syntax:
  {
    "email":"my_email"
  }
   */
  const verificationCode = utils.generateVerificationCode();
  req.session.verificationCode = verificationCode;

  //TODO: email logic...
  //in the future you will have the logic for sending the verification code to the user's email here
  //for now we'll just send it in the response

  res.json({
    success: true,
    data: verificationCode,
    message: `sent verification code${req.user ? " to " + req.user.email : ``}`,
  });
};
