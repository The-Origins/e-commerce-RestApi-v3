const router = require("express").Router();

router.get(
  "/:id",
  require("../middleware/findProduct"),
  require("../controllers/product/getProduct")
);

router.post(
  "/:id/rating/add",
  require("../middleware/isAuthenticatedAndVerified"),
  require("../middleware/findProduct"),
  require("../controllers/product/addProductRating")
);

module.exports = router;
