const express=require('express')
const router=express.Router()
const { handleUserSignup,handleUserLogin }=require('../controllers/user')

router.post('/register',handleUserSignup);

router.get('/login',handleUserLogin)

  
module.exports=router