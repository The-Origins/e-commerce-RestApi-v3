module.exports = (req, res, next) => {
  //This is for when a user completes and order this path will  decrease the stock of the item in the order by the amount passed in the body
  /*
    syntax: 
    {
        "amount":Number
    }
     */

  if (req.body.amount) {
    res.product.stock -= req.body.amount;
    res.product
      .save()
      .then((product) => {
        res.json({
          success: true,
          data: product.stock,
          message: `Decreased ${product.name}'s stock by ${amount}`,
        });
      })
      .catch((err) => next(err));
  } else {
    next(new Error(`Invalid input`));
  }
};
