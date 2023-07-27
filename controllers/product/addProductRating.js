module.exports = (req, res, next) => {
  /*syntax = 
    {
        rating:Number
    }*/
  if (req.body.rating) {
    res.product.ratings = [...res.product.ratings, Number(req.body.rating)];

    //calculate the average rating
    let ratingsTotal = 0.0;
    res.product.ratings.forEach((rating) => {
      ratingsTotal += rating;
    });

    //update vote count and rating score
    res.product.rating.votes = res.product.ratings.length;
    res.product.rating.score = (ratingsTotal / res.product.ratings.length).toFixed(2)

    res.product.save().then((product) => {
      res.json({
        success: true,
        data: product.rating,
        message: `added rating ${req.body.rating}`,
      });
    });
  } else {
    next(new Error(`Invalid input`));
  }
};
