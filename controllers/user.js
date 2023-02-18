const {v4:uuidv4} =require('uuid')
const { create } = require('../models/url')
const User = require('../models/user')
const { setUser } = require('../service/auth')



async function handleUserSignUp(req , res){
    const {name , email , password} = req.body
    await User.create({
        name,
        email,
        password,
    })

    return res.json({message: "user Created"})
}

async function handlUserLogin(req , res){
    const {email , password} = req.body
    const userObj = await User.findOne({email , password});

    if(!userObj){
        return res.json({message: "You're not Signed up , Sign up first"})
    }
    const sessionId = uuidv4()
    setUser(sessionId , userObj)
    res.cookie('uid', sessionId)
    res.json({message: "user found Welcome to the service", data: userObj})
}


module.exports = {
    handleUserSignUp,
}