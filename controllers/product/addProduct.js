const Product = require("../../models/product");
module.exports = (req, res, next) => {
  //add a new product to database
  /*syntax
  {
    "name":"product name",
    "stock":Number
    "variants":[{}, {}]
    ..etc... properties placed in the body will be used to create the product
  }
   */

  Product.create(req.body)
    .then((product) =>
      res.json({
        success: true,
        data: product,
        message: `Added product '${product.name}' to products`,
      })
    )
    .catch((err) => next(err));
};
