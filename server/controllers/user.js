const { v4: uuidv4 } = require('uuid');
const User=require('../models/user')
const {getUser,setUser} = require('../service/auth.service')

async function handleUserSignup(req,res) {
    const {firstName,lastName,userName,email,password}=req.body;
    const user=await User.create({
        fullName:{
            firstName,
            lastName
        },
        userName,
        email,
        password
    })  
    const sessionId=uuidv4(); 
    setUser(sessionId,user) 
    res.cookie('uid',sessionId)
    return res.send('user created')
}

async function handleUserLogin(req,res) {
    const {email,password}=req.body;
    const user=await User.findOne({email,password})
    if(!user) return res.send('wrong credentials')
    const sessionId=uuidv4(); 
    setUser(sessionId,user) 
    res.cookie('uid',sessionId)
    return res.send('user login done')
}
module.exports={
    handleUserSignup,
    handleUserLogin
}