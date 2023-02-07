const express = require("express")
const { objectCreatorhelper, redirectUrlhelper } = require("../controllers/url")
const router = express.Router()



router.post("/",objectCreatorhelper)
router.get("/:shortId", redirectUrlhelper)
module.exports = router