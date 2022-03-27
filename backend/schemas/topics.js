const mongoose = require("mongoose")

const topicSchema = new mongoose.Schema({
    title: {type:String,required: true, unique:true},
    posts: [{type:mongoose.Types.ObjectId, ref:"Post"}]
})

module.exports = mongoose.model("Topic",topicSchema);