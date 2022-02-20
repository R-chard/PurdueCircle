const mongoose = require("mongoose")

// Defining the fields each User has
const postSchema = new mongoose.Schema({
    author: {type:mongoose.Types.ObjectId, ref:"User",required:true},
    datePosted:{type:Date, required:true},
    message: {String, required:true, maxlength:500},
    postedAnon: {Boolean, required:true},
    topics:[{type:mongoose.Types.ObjectId, ref:"Topic"}],
    comments:[{
        author:{type:mongoose.Types.ObjectId, ref:"User"},
        datePosted: Date,
        message: String
    }],
    likes: Number,
    usersLiked: [{type:mongoose.Types.ObjectId, ref: "User"}]
})

// Tell mongoDB this is a database schema
module.exports = mongoose.model("Post",postSchema);