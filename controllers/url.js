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

async function redirectUserHandler(req , res){
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },

    {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                },
            },
    })
        // res.redirect(entry.redirectUrl)
        console.log("logging entry before sending ok --> ", entry)
        console.log("logging redirectUrl --> ", entry.redirectUrl)
        // res.json({message: "ok"})
        res.redirect(entry.redirectUrl)

        console.log("logging after sending the redirect response")
}

module.exports = {
    generateNewShortUrlhandler,
    redirectUserHandler,
}