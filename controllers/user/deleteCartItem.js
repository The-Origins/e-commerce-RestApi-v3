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


  //delete the cart item
  req.user.cart.items.splice(req.user.cart.items.indexOf(item), 1)

  
  //save the updates
  req.user
    .save()
    .then(() => {
      next()
    })
    .catch((err) => next(err));
};
