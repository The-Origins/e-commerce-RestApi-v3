const Product = require("../../models/product");

module.exports = (req, res, next) => {
    //fetch all the products (for admins)
  Product.find()
    .then((products) => {
      res.json({
        success: true,
        data: products,
        message: `retrived all products`,
      });
    })
    .catch((err) => next(err));
};
