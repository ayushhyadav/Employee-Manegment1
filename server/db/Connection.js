const mongoose = require("mongoose");


const DB="mongodb://Aayushh:mern1234@ac-evgngor-shard-00-00.t2hv6yu.mongodb.net:27017,ac-evgngor-shard-00-01.t2hv6yu.mongodb.net:27017,ac-evgngor-shard-00-02.t2hv6yu.mongodb.net:27017/Employee?ssl=true&replicaSet=atlas-7jrbwf-shard-0&authSource=admin&retryWrites=true&w=majority"


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>
 console.log("connection start"))
.catch((error)=>
 console.log("error.message"));