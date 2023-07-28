const Order = require("../../models/order");
module.exports = (req, res, next) => {
  /*syntax
    {
        "stage":"new_order_stage"
    }
     */
  if (req.body.stage) {
    Order.find({ _id: req.params.orderId })
      .then((order) => {
        if (!order) {
          return next(new Error(`No order with id: ${req.params.orderId}`));
        }
        order.stage = req.body.stage;
        order.save().then((updatedOrder) => {
          res.json({
            success: true,
            data: updatedOrder,
            message: `updated order: ${updatedOrder._id}`,
          });
        });
      })
      .catch((err) => next(err));
  }
};
