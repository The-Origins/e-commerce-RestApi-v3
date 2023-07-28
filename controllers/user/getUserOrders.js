const Order = require("../../models/order");

module.exports = (req, res, next) => {
  Order.find({ user: req.user._id })
    .populate({
      path: "order",
      populate: { path: "items", populate: { path: "product" } },
    })
    .then((orders) => {
      if (!orders) {
        return next(new Error(`No orders for user: '${req.user.name.first}'`));
      }

      res.json({
        success: true,
        data: orders,
        message: `retrieved orders for user: '${req.user.name.first}'`,
      });
    })
    .catch((err) => next(err));
};
