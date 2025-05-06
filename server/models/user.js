const {Schema, model}=require('mongoose')

const userSchema=new Schema({
    fullName:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
},{timestamps:true})

const UserModel=model('user',userSchema)

module.exports=UserModel;