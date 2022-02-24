const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    author: {type:mongoose.Types.ObjectId, ref:"User",required:true},
    datePosted:{type:Date, required:true},
    message: {type:String, required:true, maxlength:500},
    postedAnon: {type:Boolean, required:true},
    topicNames:[{type:String}],
    comments:[{
        author:{type:mongoose.Types.ObjectId, ref:"User"},
        datePosted: Date,
        message: String
    }],
    likes: Number,
    usersLiked: [{type:mongoose.Types.ObjectId, ref: "User"}]
})

module.exports = mongoose.model("Post",postSchema);