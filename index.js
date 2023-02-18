const express = require("express")
const mongoose  = require("mongoose")
const bodyParser = require("body-parser")
// const { connectMongoDB } = require("./connection")
const URL = require("./models/url")
const shortID = require("shortid")
const urlRoute = require('./routes/url')
const app = express()
const cors = require('cors')

app.use(cors())

const PORT = 7400


mongoose.connect('mongodb://127.0.0.1:27017/shortly-app', {
  useNewUrlParser: true, useUnifiedTopology: true
})

// middlewares

app.use(bodyParser.json())

app.use(express.urlencoded({extended: false}))

// routes
const router = require("./routes/url")
const userRoute = require("./routes/user")
app.use("/",router)
app.use("/user",userRoute)






app.listen(PORT, () => console.log("server started"))