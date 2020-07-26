const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const SearchSchema=new Schema({
    movie:{
        type:String
    }
    
})

module.exports=Search=mongoose.model('search',SearchSchema);