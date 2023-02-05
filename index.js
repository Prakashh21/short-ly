const express = require("express")
const mongoose  = require("mongoose")
const { connectMongoDB } = require("./connection")
const urlRoute = require('./routes/url')
const app = express()

const PORT = 8001

mongoose.set('strictQuery', true);

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("connected to mongoDB"))

app.use(express.json())


app.use("/url",urlRoute)

app.listen(PORT, () => console.log("server started"))