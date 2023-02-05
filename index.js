const express = require("express")
const mongoose  = require("mongoose")
const { connectMongoDB } = require("./connection")
const URL = require("./models/url")
const urlRoute = require('./routes/url')
const app = express()

const PORT = 8001

mongoose.set('strictQuery', true);

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("connected to mongoDB"))

app.use(express.json())


app.use("/url",urlRoute)
app.get("/:shortId", async (req , res) =>{

    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },

    {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
    })
        // res.redirect(entry.redirectUrl)
        console.log("logging entry before sending ok --> ", entry)
        console.log("logging redirectUrl --> ", entry.redirectUrl)
        // res.json({message: "ok"})
        res.redirect(entry.redirectUrl)

})

app.listen(PORT, () => console.log("server started"))