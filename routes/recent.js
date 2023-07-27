const router = require("express").Router()

router.get("/", require("../controllers/recent/getRecent"))


module.exports = router