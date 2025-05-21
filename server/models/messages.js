const {Schema, model}=require('mongoose')
const User = require('../models/user');

const messageSchema=new Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    timestamp: {
    type: Date,
    default: Date.now,
  }
    
},{timestamps:true})

const MessageModel=model('message',messageSchema)

module.exports=MessageModel;