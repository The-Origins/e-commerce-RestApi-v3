module.exports = (req, res, next) => {
  /*req.body syntax:
    {
        "product":{...product data}
    }
     */

  //update recent session activity array
  //this is done automatically when you -> GET /api/product/:id
  //but if you need to manually do it you must be admin
  const maxActivityAmount = 10;
  if (!req.body.product) {
    res.code = 400;
    return next(new Error("Invalid input"));
  }

  //update recent cart activity
  req.session.recent = [req.body.product, ...req.session.recent];

  //limit recent cart activity
  if (req.session.recent.length >= maxActivityAmount) {
    req.session.recent.splice(maxActivityAmount, 1);
  }

  //return recent cart activity
  res.json({
    success: true,
    data: req.session.recent,
    message: `updated recent session activity`,
  });
};
