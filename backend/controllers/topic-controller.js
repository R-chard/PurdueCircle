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

const getPostsByTopic = async(req,res,next) => {
    const title = req.params.title
    const userID = req.session.userID

    let topic
    try{
        topic = await Topic.findOne({title})
    } catch(err){
        return next(err)
    }
    let data = {}
    data.posts = []
    if(topic){
        for(let postID of topic.posts){
            data.posts.push(await Post.findById(postID))
        }
        
        // if user logged in
        if (userID){
            try{
                user = await User.findById(userID)
                // logged in + user is following the searched topic
                if(user && user.topics_followed.includes(topic._id)){
                    data.following = true
                } else{
                // logged in + user is not following the searched topic
                    data.following = false
                }
            } catch(err){
                return next(err)
            }
        }
    }

    res.status(200).json({data})
}

const followTopic = async(req,res,next) => {
    const userID = req.session.userID
    const title = req.body.title

    let user
    let topic

    try{
        user = await User.findById(userID)
        topic = await Topic.findOne({title})

    } catch(err){
        return next(err)
    }

    if(!user || !topic){
        res.status(404).json({isFound:false})
        return
    }

    user.topics_followed.push(topic._id)
    user.save()
    res.status(200).json({success:true})
}

const unfollowTopic = async(req,res,next) => {
    const userID = req.session.userID
    const title = req.body.title

    let topic
    let user

    try{
        user = await User.findById(userID)
        topic = await Topic.findOne({title})
    } catch(err){
        return next(err)
    }

    if(!user || !topic){
        res.status(404).json({isFound:false})
        return
    }

    const followedTopicsIndex = user.topics_followed.indexOf(topic._id)
    user.topics_followed.splice(followedTopicsIndex,1)
    user.save()

    res.status(200).json({success:true})
}

exports.search = search
exports.getPostsByTopic = getPostsByTopic
exports.followTopic = followTopic
exports.unfollowTopic = unfollowTopic