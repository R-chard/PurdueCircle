const mongoose = require("mongoose")

// Defining the fields each User has
const topicSchema = new mongoose.Schema({
    topicName: {type:String,required: true},
    topicPost: {type: String, required:true},
    topicFollower: {type:String, required: true}
})

// Tell mongoDB this is a database schema
module.exports = mongoose.model("Topic",topicSchema);