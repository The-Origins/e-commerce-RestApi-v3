const Product = require("../../models/product");
module.exports = (req, res, next) => {

  //delete product passed in the request parameters
  Product.findByIdAndDelete(res.product._id)
    .then((product) => {
      res.json({
        success: true,
        data: product,
        message: `Deleted product ${product.name} from products`,
      });
    })
    .catch((err) => next(err));
};
