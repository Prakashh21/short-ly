const { response } = require("express")
const shortid  = require("shortid")
const URL = require("../models/url")

async function generateNewShortUrlhandler(req , res){
    const body = req.body
    const shortId = shortid()
    if(!body.url) return res.status(400).json({error:"url not provided"})
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    })

    return res.json({id:shortId})
}

module.exports = {
    generateNewShortUrlhandler,
}