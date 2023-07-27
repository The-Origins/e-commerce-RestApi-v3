module.exports = (req, res, next) => {
  //keep track of the changed properties
  const updates = Object.keys(req.body).join(", ");

  //loop through the body and update the req.user's body with the new info
  for (let property in req.body) {
    req.user[property] = req.body[property];
  }

  //save the user
  req.user.save().then((user) =>
    res.json({
      success: true,
      data: user,
      message: `Updated ${updates} in user: ${user.name.first}`,
    })
  );
};
