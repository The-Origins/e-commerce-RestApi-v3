const router = require("express").Router();

router.get("/", require("../controllers/code/generateCode"));
router.post("/verify", require("../controllers/code/validateCode"));

module.exports = router;
