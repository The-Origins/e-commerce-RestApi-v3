const router = require("express").Router();

router.use(require("../middleware/isAdmin"))

//update and get all the orders
router.get("/orders", require("../controllers/admin/getOrders"));

//update the order stage as it is fullfilled
router.patch("/orders/update/:orderId/stage", require("../controllers/admin/updateOrderStage"))

//update and get all the products
router.get("/products", require("../controllers/admin/getProducts"));
router.post(
    "/products/add",
    require("../controllers/admin/addProduct")
  );
router.patch(
    "/products/:id/update",
    require("../middleware/findProduct"),
    require("../controllers/admin/updateProduct")
  );
router.delete(
    "/products/:id/delete",
    require("../middleware/findProduct"),
    require("../controllers/admin/deleteProduct")
  );
module.exports = router;
