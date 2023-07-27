const router = require("express").Router();

//assign the respective routers and controllers to their paths
router.use(require("../controllers/recent/resetSessionRecent"));
router.use(require("../controllers/code/resetSessionCode"));
router.use("/api", require("./api"));
// router.use("/console", require("../public"));   
router.all("*", require("../controllers/page404"));
router.use(require("../middleware/errorHandler"));

module.exports = router;