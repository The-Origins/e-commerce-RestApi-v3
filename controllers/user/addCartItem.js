module.exports = (req, res, next) => {
  /* syntax:
    {
        product:product_id,
        quantity:Number,
        variant:{"name":"my variant", increment:Number (increment from standard price)}, -> only applies to products with a variant
        total:Number -> this is calculated automatically
    }
     */
  let item = req.body;
  if (item.product && item.quantity) {

    req.user.cart.items = [...req.user.cart.items, item];
    req.user
      .save()
      .then(() => {
        next()
      })
      .catch((err) => next(err));
  } else {
    next(new Error(`Invalid input`));
  }
};
