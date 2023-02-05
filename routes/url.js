const express = require("express")
const { generateNewShortUrlhandler, redirectUserHandler } = require("../controllers/url")
const router = express.Router()



router.post("/",generateNewShortUrlhandler)
router.get("/:shortId", redirectUserHandler)
module.exports = router