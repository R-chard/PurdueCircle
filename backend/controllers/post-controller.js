const Post = require("../schemas/posts")
const Topic = require("../schemas/topics")
const User = require("../schemas/users")

const create = async (req, res, next) => {
    const userID = req.session.userID;
    const {topics, text, postedAnon} = req.body;

    try {
        let currUser = await User.findById(userID);

        // check that user exists
        if (!currUser) {
            res.status(404).json({success: false});
            return;
        }

        // create new post
        let newPost = new Post({
            author: currUser,
            datePosted: new Date(),
            message: text,
            postedAnon,
            topicNames: topics,
            comments: [],
            likes: 0,
            usersLiked: []
        });

        // save posts and user
        await newPost.save()
        currUser.posts.push(newPost)
        await currUser.save()
        
        // iterate all topics
        for (let topic of topics){
            let currTopic = await Topic.findOne({ title: topic});
            // create and save new topic
            if (!currTopic) {
                const newTopic = new Topic({
                    title:topic,
                    posts:[newPost]
                })
                await newTopic.save()
            
            // add post to existing topic
            } else{
                currTopic.posts.push(newPost)
                await currTopic.save()
            }
        };
        
    } catch (error) {
        return next(error);
    }
    res.status(200).json({success:true});
    
}

const like = async(req,res,next) => {
    const postID = req.body.postID
    const user = req.session.userID
    let post
    try{
        post = await Post.findById(postID)
        post.usersLiked.push(user)
        post.likes++
        await post.save()
    } catch(error){
        return next(error)
    }
    res.status(200).json({success:true})
}

const unlike = async(req,res,next) => {
    const postID = req.body.postID
    const user = req.session.userID
    let post
    try{
        post = await Post.findById(postID)
        const userLikedIndex = post.usersLiked.indexOf(user._id)
        post.usersLiked.splice(userLikedIndex,1)
        post.likes--
        await post.save()
    } catch(error){
        return next(error)
    }
    res.status(200).json({success:true})
}

// TODO: add into users to mark that users interact with post
const comment = async(req,res,next)=>{
    const {postID,message} = req.body
    const user = req.session.userID
    const comment = {
        author:user,
        datePosted: new Date(),
        message
    }

    // save comment 
    try{
        let post = await Post.findById(postID)
        post.comments.push(comment)
        post.save()
    } catch(error){
        return next(error)
    }
    res.status(200).json({success:true})

}

//currently sends list of past post with all post properties
const retrievePastPosts = async(req,res,next) => {
    let pastPosts = [];
    const userID = req.session.userID;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
    }

    try {
        //currUser = await User.findById(userID);
        for (let i = 0; i < currUser.posts.length; i++) {
            tempPost = await Post.findById(currUser.posts[i]);
            pastPosts.push(tempPost)
        }
    } catch (error) {
        return next(error);
    }
    res.status(200).json({pastPosts});

}

exports.create = create
exports.like = like
exports.unlike = unlike
exports.comment = comment
exports.retrievePastPosts = retrievePastPosts
