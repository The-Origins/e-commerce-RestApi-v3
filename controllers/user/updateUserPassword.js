const utils = require("../../lib/utils");
const User = require("../../models/user");

module.exports = (req, res, next) => {
  /*syntax:
    {
        "email":"user email"
        "password":"new password"
    }
     */

  //Check if the session is verified
  //to verify the session call the GET /api/code then verify the user input at POST /api/code/verify
  //then pass in the email the user entered and the new password the user entered
  if (req.session.isVerified) {
    if (req.body.password && req.body.email) {
      const generated = utils.generatePasswordHash(req.body.password);
      User.findOne({ email: req.body.email })
        .then((user) => {

          //update the user hash and user salt
          user.hash = generated.hash;
          user.salt = generated.salt;

          //save the user
          user.save().then((updatedUser) => {
            res.json({
              success: true,
              data: updatedUser,
              message: `updated password for user ${updatedUser.name.first}`,
            });
          });
        })
        .catch((err) => next(err));
    } else {
      next(new Error(`Invalid input`));
    }
  } else {
    next(new Error(`Unauthorized`));
  }
};
