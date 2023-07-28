const Order = require("../../models/order");

module.exports = (req, res, next) => {
  //fetch all the orders (for admins)
  Order.find()
    .populate("user")
    .populate({
      path: "order",
      populate: { path: "items", populate: { path: "product" } },
    })
    .then((orders) => {
      res.json({ success: true, data: orders, message: `retrived all orders` });
    })
    .catch((err) => next(err));
};
