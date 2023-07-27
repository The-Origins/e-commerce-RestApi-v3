const Order = require("../../models/order");
const Product = require("../../models/product");

module.exports = (req, res, next) => {
  /*syntax:
    {
        address:{...user input}
        //this is to allow users to change their delivery location
        //if you pass in an address the 
    }
     */

    if(!req.user.cart.items.length)
    {
        return next(new Error("No cart items"))
    }

  //create a new order on check out
  Order.create({
    deliveryLocation: req.body.address || req.user.address,
    order: req.user.cart,
    user: req.user._id,
  })
    .then((order) => {

        //decrease the product stock
        req.user.populate({path:"cart", populate:{path:"items", populate:{path:"product"}}}).then((user) => {
            user.cart.items.forEach((item) =>
            {
                Product.findOne({_id:item.product._id}).then((p) =>
                {
                    p.stock = item.product.stock - item.quantity
                    p.save()
                })
            })
        })


        //reset the user cart
        req.user.cart = {items:[], total:0}

        //save the user
        req.user.save()
        .then((updatedUser) => 
        {
            res.json({success:true, data:order, message:`Added order for user: ${updatedUser.name.first}`})
        })
    })
    .catch((err) => next(err));
};
