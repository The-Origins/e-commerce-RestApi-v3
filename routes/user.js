const router = require("express").Router();
const passport = require("passport");

router.use("/cart", require("../middleware/isAuthenticatedAndVerified"));

//return user
router.get(
  "/",
  require("../middleware/isAuthenticatedAndVerified"),
  require("../controllers/user/getUser")
);

//register/create user
router.post("/register", require("../controllers/user/register"));

//login user
router.post(
  "/login",
  require("../middleware/persistSession"),
  passport.authenticate("local", {
    failureRedirect: "/api/user/login-faliure",
  }),
  require("../controllers/user/loggedIn")
);

//update user
router.patch(
  "/update",
  require("../middleware/isAuthenticatedAndVerified"),
  require("../controllers/user/updateUser")
);

//update user password
router.patch("/password/update", require("../controllers/user/updateUserPassword"))

//logout user
router.delete("/logout", require("../controllers/user/logout"));

//path for login faliure
router.get("/login-faliure", require("../controllers/user/loginFaliure"));

//handle user cart
router.get("/cart", require("../middleware/updateCart"));
router.post(
  "/cart/add",
  require("../controllers/user/addCartItem"),
  require("../middleware/updateCart")
);
router.patch(
  "/cart/update/:itemId",
  require("../controllers/user/updateCartItem"),
  require("../middleware/updateCart")
);
router.delete(
  "/cart/delete/:itemId",
  require("../controllers/user/deleteCartItem"),
  require("../middleware/updateCart")
)

router.post("/checkout", require("../middleware/isAuthenticatedAndVerified"), require("../controllers/order/checkout"))

module.exports = router;
