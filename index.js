const express = require("express")
const mongoose  = require("mongoose")
const bodyParser = require("body-parser")
// const { connectMongoDB } = require("./connection")
const URL = require("./models/url")
const shortID = require("shortid")
const urlRoute = require('./routes/url')
const router = require("./routes/url")
const app = express()


const PORT = 8001

// mongoose.set('strictQuery', true);

// connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("connected to mongoDB"))

// connecting to mongoose

mongoose.connect('mongodb://127.0.0.1:27017/shortly-app', {
  useNewUrlParser: true, useUnifiedTopology: true
})

// middlewares

app.use(bodyParser.json())

app.use(express.urlencoded({extended: false}))

// routes
app.use("/",router)

app.listen(PORT, () => console.log("server started"))