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
        currUser = await User.findById(user)
        if(!post || !currUser){
            return next(new Error("User or post cannot be found"))
        }
        post.usersLiked.push(user)
        post.likes++
        const inter = {
            post: postID,
            date: new Date(),
            interactionType: "like"
        }
        currUser.interactions.push(inter)
        await post.save()
        await currUser.save()
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
        currUser = await User.findById(user)
        if(!post || !currUser){
            return next(new Error("User or post cannot be found"))
        }
        const userLikedIndex = post.usersLiked.indexOf(user._id)
        post.usersLiked.splice(userLikedIndex,1)
        post.likes--
        let intIndex = -1;
        for (let i = 0; i < currUser.interactions.length; i++) {
            if (currUser.interactions[i].post == postID) {
                intIndex = i;
            }    
        }

        if (intIndex > -1) {
            currUser.interactions.splice(intIndex, 1)
        }
        await currUser.save()
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
        let currUser = await User.findById(user)
        if(!post || !currUser){
            return next(new Error("User or post cannot be found"))
        }
        post.comments.push(comment)
        const inter = {
            post: postID,
            date: new Date(),
            interactionType: "comment"
        }
        currUser.interactions.push(inter)
        await post.save()
        await currUser.save()
    } catch(error){
        return next(error)
    }
    res.status(200).json({success:true})

}

//currently sends list of past post with all post properties
const retrievePastPosts = async(req,res,next) => {
    let pastPosts = [];
    const userID = req.session.userID;
    let currUser

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
    }

    try {
        for (let i = 0; i < currUser.posts.length; i++) {
            tempPost = await Post.findById(currUser.posts[i]);
            pastPosts.push(tempPost)
        }
    } catch (error) {
        return next(error);
    }
    res.status(200).json({pastPosts});

}

const retrieveFollowedPosts = async(req,res,next) => {
    let pastPosts = [];
    let followed = [];
    const userID = req.session.userID;
    let currUser

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
    }

    try {
        for (let i = 0; i < currUser.users_following.length; i++) {
            tempFollowed = await User.findById(currUser.users_following[i]);
            followed.push(tempFollowed)
        }
    } catch (error) {
        return next(error);
    }

    try {
        for (let i = 0; i < followed.length; i++) {
            for (let j = 0; j < followed[i].posts.length; j++){
                tempPost = await Post.findById(followed[i].posts[j]);
                pastPosts.push(tempPost)
            }
            
        }
    } catch (error) {
        return next(error);
    }

    res.status(200).json({pastPosts});

}

const retrieveSavedPosts = async(req,res,next) => {
    const userID = req.session.userID
    let currUser
    try{
        currUser = (await User.findById(userID).populate("saved_posts")).toObject()
        if(currUser.saved_posts){
            for(let i=0;i< currUser.saved_posts.length;i++){
                let authorID = currUser.saved_posts[i].author
                currUser.saved_posts[i].author = await User.findById(authorID,{"username":1,"profile_img":1})
            }
        }
        
    } catch(error){
        return next(error)
    }

    res.status(200).json({savedPosts:currUser.saved_posts})
}

/*
const retrieveSavedPosts = async(req,res,next) => {
    const userID = req.session.userID
    let page = 0; // change for request parameter
    const limit = 5; // max number of posts to be returned
    let currUser
    try{
        currUser = await User.findById(userID).populate("saved_posts",{
            path:"author",
            select:"username profile_img",
        })
    } catch(error){
        return next(error)
    }

    // sorted array of posts by date
    let sortedPosts = currUser.saved_posts.sort((a,b) => (a.datePosted < b.datePosted) ? 1 : -1)
    let sendPosts = [];

    // loop through corresponding posts to send
    for (let i = 0; i < limit; i++) {
        let index = page + i;
        if (index < sortedPosts.length) {
            sendPosts.push(sendPosts(index))
        }
        
    }
    res.status(200).json({savedPosts:sendPosts})
    //res.status(200).json({savedPosts:currUser.saved_posts})
}
*/

const postById = async(req,res,next) => {
    const postID = req.params.postID
    const userID = req.session.userID
    let post
    try{
        post = (await Post.findById(postID).populate(["comments", 
        {
            path:"author",
            select:"username profile_img",
        },{
            path:"comments.author",
            select: "username profile_img"
        }])).toObject()
        post.hasLiked = false
        for (let likedUsersID of post.usersLiked){
            if (likedUsersID.toString() === userID){
                post.hasLiked = true
            }
        }
        let user = await User.findById(userID)
        for (let savedPost of user.saved_posts){
            if (savedPost.toString() === postID){
                post.isSaved = true
            }
        }
    } catch(error){
        return next(error)
    }
    res.status(200).json({post})
}

const fetchRecentPosts = async(req,res,next) => {
    let pastPosts = [];
    let followed = [];
    let topics = [];
    const userID = req.session.userID;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
    }

    //adds followed users into followed
    try {
        //gets users in the following item (following means people the requesting-user is following)
        for (let i = 0; i < currUser.users_following.length; i++) {
            
            tempFollowed = await User.findById(currUser.users_following[i]);
            followed.push(tempFollowed)
        }
    } catch (error) {
        return next(error);
    }

    //adds posts of followed users into pastposts
    try {
        //currUser = await User.findById(userID);
        for (let i = 0; i < followed.length; i++) {
            for (let j = 0; j < followed[i].posts.length; j++){
                tempPost = await Post.findById(followed[i].posts[j]);
                pastPosts.push(tempPost)
            }
            
        }
    } catch (error) {
        return next(error);
    }

    //adds all topics followed into topics array
    try {
        
        for (let i = 0; i < currUser.topics_followed.length; i++) {
            tempTopics = await Topic.findById(currUser.topics_followed[i]);
            topics.push(tempTopics)
        }
    } catch (error) {
        return next(error);
    }
    
    //adds all posts from topics into post array
    try {
        
        for (let i = 0; i < topics.length; i++) {
            for (let j = 0; j < topics[i].posts.length; j++) {
                tempPost = await Post.findById(topics[i].posts[j]);
                pastPosts.push(tempPost)
                
            }
            
        }
    } catch (error) {
        return next(error);
    }

    let droppedNull = pastPosts.filter(function (x) {
        return x != null;
      });
    
    //idk how it works but it removes duplicates and thats all i care about
    const uniqueSet = new Set(droppedNull.map(post => JSON.stringify(post)))
    const noDuplicates = [...uniqueSet].map((item) => {
        if (typeof item === 'string') return JSON.parse(item);
        else if (typeof item === 'object') return item;
      })

    //used to use pastPosts, now noDuplicates
    
    noDuplicates.sort(function(a,b){
        return new Date(b.datePosted) - new Date(a.datePosted)
      }
    )
    let finalList = []
    for (let i = 0; i < noDuplicates.length; i++) {
        let post = noDuplicates[i]
        const author = await User.findById(post.author)
        post.author = {}
        post.author.username = author.username
        post.author.profile_img = author.profile_img
        finalList.push(post)
    }

    for(let list of finalList){
        if (list.usersLiked.includes(userID)){
            list.hasLiked = true
        } else{
            list.hasLiked = false
        }
    }
    res.status(200).json({finalList});

}

const save = async(req,res,next) => {
    const postID = req.body.postID
    const user = req.session.userID
    let post
    try{
        post = await Post.findById(postID)
        const currUser = await User.findById(user)
        if(!post || !currUser){
            return next(new Error("User or post cannot be found"))
        }
        currUser.saved_posts.push(postID)
        const inter = {
            post: postID,
            date: new Date(),
            interactionType: "save"
        }
        currUser.interactions.push(inter)
        await currUser.save()

    } catch(err){
        return next(err)
    }
    res.status(200).json({success:true})
}

const unsave = async(req,res,next)=>{
    const postID = req.body.postID
    const user = req.session.userID
    let post
    try{
        post = await Post.findById(postID)
        const currUser = await User.findById(user)
        if(!post || !currUser){
            return next(new Error("User or post cannot be found"))
        }
        const savedIndex = currUser.saved_posts.indexOf(postID)
        currUser.saved_posts.splice(savedIndex,1)

        let intIndex = -1;
        for (let i = 0; i < currUser.interactions.length; i++) {
            if (currUser.interactions[i].post == postID) {
                intIndex = i;
            }    
        }

        if (intIndex > -1) {
            currUser.interactions.splice(intIndex, 1)
        }
        await currUser.save()

    } catch(err){
        return next(err)
    }
    res.status(200).json({success:true})
}

exports.create = create
exports.like = like
exports.unlike = unlike
exports.save = save
exports.unsave = unsave
exports.comment = comment
exports.retrievePastPosts = retrievePastPosts
exports.retrieveFollowedPosts = retrieveFollowedPosts
exports.retrieveSavedPosts = retrieveSavedPosts
exports.postById = postById
exports.fetchRecentPosts = fetchRecentPosts