module.exports = (req, res, next) => {

  //add the product to recent session activity...

  //check if the product is already in recent session activity
  const activity = req.session.recent.find((activity) => String(activity._id) === String(res.product._id))

  //remove the duplicate product
  if(activity)
  {
    req.session.recent.splice(req.session.recent.indexOf(activity), 1)
  }

  //if you are adding a duplicate product to the recent session activity array this will delete the one already in the array and add the new 
  //add the product to recent session activity
  req.session.recent = [res.product, ...req.session.recent]

  //limit the amount of products in the array
  if(req.session.recent.length > 10)
  {
    req.session.recent.splice(10, 1)
  }

  //return the product
  res.json({
    success: true,
    data: res.product,
    message: `retrived product '${res.product.name}'`,
  });
};
