const mongoose =  require('mongoose');
const config = require("config")
require("dotenv").config();


mongoose.connect("mongodb://127.0.0.1:27017/Network-Touch")
// mongoose.connect(`${config.get("MONGODB_URI")}/ConnectNetwork`)
.then(function(){
    console.log("Connected to MongoDB");
})
.catch(function(err){
    console.log(err)
    // console.log("can't connect")
})

module.exports = mongoose.connection;