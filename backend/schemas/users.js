const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {type:String,required:true,unique:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    profile_img: String,
    topics_followed: [{type:mongoose.Types.ObjectId, ref:"Topic"}],
    biography:String,
    users_followed: [{type:mongoose.Types.ObjectId, ref:"User"}]
})

// Tell mongoDB this is a database schema
module.exports = mongoose.model("User",userSchema);