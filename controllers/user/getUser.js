module.exports = (req, res, next) => {
  req.user.populate({path:"cart", populate:{path:"items", populate:{path:"product"}}}).then((user) =>
      res.json({
        success: true,
        data: user,
        message: `retrieved user ${user.name.first}`,
      })
    );
};
