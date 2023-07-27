const User = require("../../models/user");
const utils = require("../../lib/utils");

module.exports = (req, res, next) => {
  //add a new user to the database
  if (req.body.email && req.body.password) {
    //generate a user password hash and salt
    const generated = utils.generatePasswordHash(req.body.password);

    //add the user
    User.create({ ...req.body, ...generated })
      .then((user) => {
        res.json({
          success: true,
          data: user,
          message: `registered user '${user.name.first}' to user`,
        });
      })
      .catch((err) => next(err));
  } else {
    res.code = 400;
    next(new Error(`Invalid input`));
  }
};
