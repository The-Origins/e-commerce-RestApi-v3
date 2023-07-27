module.exports = (req, res, next) =>
{
    req.user.populate({path:"cart", populate:{path:"items", populate:{path:"product"}}}).then((user) =>
    {
        let cartTotal = 0
        const date = new Date()

        user.cart.items.forEach((item) =>
        {
            //find the variant exists in the product variants array if the variant doesn't exist then the total will be calculated using the base price
            //each variant has an increment that it adds to the product base price (it is 0 for the base variant)
            //if there was no variant passed in then this will set the cart item's variant equals to the first instance where the increment is 0
            let variant = item.product.variants.find((v) => v.name === item.variant) || item.product.variants.find((v) => v.increment === 0) || {increment:0}
            item.variant = variant.name

            //add the increment to the product base price and multiply that by the quantity
            item.total = (item.product.unitPrice.amount + variant.increment) * item.quantity 
            cartTotal += item.total
            item.updatedAt = date.toISOString(Date.now())
        })
        user.cart.total = cartTotal
        user.save().then((updatedUser) => {
            res.json({success:true, data:updatedUser.cart, message:`updated user:${req.user.name.first}'s cart`})
        })
    })
    .catch((err) => next(err))
}