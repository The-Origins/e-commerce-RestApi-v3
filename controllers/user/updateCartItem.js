module.exports = (req, res, next) => {
  /* syntax:
        {
            quantity:Number,
            variant:String, -> only applies if the product has a variant
        }
         */

  //find the item in the cart
  let item = req.user.cart.items.find((item) => String(item._id) === String(req.params.itemId))

  //if item doesn't exist then return nothing
  if (!item){
    return next(new Error(`No item with id:${req.params.itemId}`));
  }


  //update the cart item
  req.user.cart.items[req.user.cart.items.indexOf(item)].quantity =
    req.body.quantity;
  req.user.cart.items[req.user.cart.items.indexOf(item)].variant =
    req.body.variant;

  //
  req.user
    .save()
    .then(() => {
      next()
    })
    .catch((err) => next(err));
};
