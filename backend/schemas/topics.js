const mongoose = require("mongoose")

// Defining the fields each User has
const topicSchema = new mongoose.Schema({
    title: {type:String,required: true},
    posts: [{type:mongoose.Types.ObjectId, ref:"Post"}]
})

// Tell mongoDB this is a database schema
module.exports = mongoose.model("Topic",topicSchema);