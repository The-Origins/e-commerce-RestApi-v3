const Product = require("../models/product");

module.exports = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (!product) {
        next(new Error(`No product with id: ${req.params.id}`));
      }
      res.product = product;
      next();
    })
    .catch((err) => next(err));
};
