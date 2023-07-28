module.exports = (req, res, next) => {
  const updates = Object.keys(req.body).join(", ");

  //update a product based off the properties you pass in
  /*syntax:
  {
    "product_property":"my_new_value" 
    //you don't have to pass in the entire product, this will only change the property passed in the req body
  }
   */
  for (let property in req.body) {
    res.product[property] = req.body[property];
  }

  res.product
    .save()
    .then((product) => {
      res.json({
        success: true,
        data: product,
        message: `updated ${updates} in product: ${product.name}`,
      });
    })
    .catch((err) => next(err));
};
