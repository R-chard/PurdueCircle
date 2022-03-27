const Post = require("../schemas/posts")
const Topic = require("../schemas/topics")
const User = require("../schemas/users")

const search = async (req,res,next) => {
    const QUERY_LIMIT = 5
    const query = req.params.query
    // Prioritize finding Users with the specified name
    let results = await User.find({"username": new RegExp(query,'i')}).limit(QUERY_LIMIT)
    if (results.length < QUERY_LIMIT){
        diff = QUERY_LIMIT - results.length
        let foundTopics = await Topic.find({"title": new RegExp(query,'i')}).limit(diff)
        results.push(...foundTopics)
    }

    res.status(200).json({results})
}

const getPosts = async(req,res,next) => {
    const title = req.params.title
    let topic
    try{
        topic = await Topic.findOne({title})
    } catch(err){
        return next(err)
    }
    let posts = []
    if(topic){
        for(let postID of topic.posts){
            posts.push(await Post.findById(postID))
        }
    }

    res.status(200).json({posts})
}

exports.search = search
exports.getPosts = getPosts