const express=require('express')
const router=express.Router()
const { getAllUsers }=require('../controllers/api')

router.get('/allusers',getAllUsers)

module.exports=router;