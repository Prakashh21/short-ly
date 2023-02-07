const { response } = require("express")
const shortID  = require("shortid")
const URL = require("../models/url")
const mongoose = require("mongoose")

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

async function objectCreatorhelper(req , res ){
    console.log("parser request body --> ", req.body.url )
    const shortendId = shortID.generate()
    const entry = await URL.create({
                    shortUrl: shortendId,
                    longUrl: req.body.url
       })

    res.json(entry)

}

async function redirectUrlhelper(req , res){
    const reqObj = await URL.findOne({shortUrl: req.params.shortId})
    console.log("req obj -->",reqObj)
    if(reqObj == null) return res.status(404)

    reqObj.visitHistory.push({timeStamp: Date.now()})
    reqObj.save()

    // res.json({message: "ok"})
    res.redirect(reqObj.longUrl)
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
    objectCreatorhelper,
    redirectUrlhelper
}