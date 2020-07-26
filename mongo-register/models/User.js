const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const UserSchema=new Schema({
    first_name:{
        type:String
    },
    last_name:{
        tyep:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    
})

module.exports=User=mongoose.model('users',UserSchema);