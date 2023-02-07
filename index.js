const express = require("express")
const mongoose  = require("mongoose")
const bodyParser = require("body-parser")
// const { connectMongoDB } = require("./connection")
const URL = require("./models/url")
const shortID = require("shortid")
const urlRoute = require('./routes/url')
const app = express()

const PORT = 8001

// mongoose.set('strictQuery', true);

// connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("connected to mongoDB"))

mongoose.connect('mongodb://localhost/shortly-app', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))

app.post("/", async (req , res) => {
    console.log("parser request body --> ", req.body.url )
    const shortendId = shortID.generate()
    const entry = await URL.create({
                    shortUrl: shortendId,
                    longUrl: req.body.url
       })

    res.json(entry)


})

app.get("/:shortId" , async (req , res) => {
    const reqObj = await URL.findOne({shortUrl: req.params.shortId})
    console.log("req obj -->",reqObj)
    if(reqObj == null) return res.status(404)

    reqObj.visitHistory.push({timeStamp: Date.now()})
    reqObj.save()

    // res.json({message: "ok"})
    res.redirect(reqObj.longUrl)
})

app.listen(PORT, () => console.log("server started"))