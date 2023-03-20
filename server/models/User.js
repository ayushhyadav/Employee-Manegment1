const mongoose =require('mongoose')

const dataSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
 
});

const Data = new mongoose.model("Data",dataSchema);

module.exports = Data;
