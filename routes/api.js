const router = require("express").Router()


router.use("/results", require("./results"))
router.use("/user", require("./user"))
router.use("/product", require("./product"))
router.use("/code", require("./code"))
router.use("/recent", require("./recent"))


module.exports = router