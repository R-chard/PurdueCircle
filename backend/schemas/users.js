const mongoose = require("mongoose")

// Defining the fields each User has
const userSchema = new mongoose.Schema({
    username: {type:String,required: true},
    email: {type: String, required:true},
    password: {type:String, required: true},
    profile_img: {type:String, required:true},
})

// Tell mongoDB this is a database schema
module.exports = mongoose.model("User",userSchema);