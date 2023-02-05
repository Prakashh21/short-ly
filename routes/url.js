const express = require("express")
const { generateNewShortUrlhandler } = require("../controllers/url")
const router = express.Router()



router.post("/",generateNewShortUrlhandler)

module.exports = router