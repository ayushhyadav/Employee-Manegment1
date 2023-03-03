const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
   
    city: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    }
   
});

const users = new mongoose.model("users",userSchema);


module.exports = users;