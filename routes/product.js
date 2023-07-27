const router = require("express").Router();

router.post(
  "/add",
  require("../middleware/isAdmin"),
  require("../controllers/product/addProduct")
);
router.get(
  "/:id",
  require("../middleware/findProduct"),
  require("../controllers/product/getProduct")
);
router.post(
  "/:id/update",
  require("../middleware/isAdmin"),
  require("../middleware/findProduct"),
  require("../controllers/product/updateProduct")
);
router.post(
  "/:id/rating/add",
  require("../middleware/isAuthenticatedAndVerified"),
  require("../middleware/findProduct"),
  require("../controllers/product/addProductRating")
);
router.patch(
  "/:id/stock/update",
  require("../middleware/isAuthenticatedAndVerified"),
  require("../middleware/findProduct")
);
router.delete(
  ":id/delete",
  require("../middleware/isAdmin"),
  require("../middleware/findProduct"),
  require("../controllers/product/deleteProduct")
);

module.exports = router;
