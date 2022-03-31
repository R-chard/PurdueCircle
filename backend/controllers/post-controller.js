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

const retrieveFollowedPosts = async(req,res,next) => {
    let pastPosts = [];
    let followed = [];
    const userID = req.session.userID;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
    }

    try {
        //currUser = await User.findById(userID);
        for (let i = 0; i < currUser.users_following.length; i++) {
            tempFollowed = await User.findById(currUser.users_following[i]);
            followed.push(tempFollowed)
        }
    } catch (error) {
        return next(error);
    }

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

    res.status(200).json({pastPosts});

}

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
        //currUser = await User.findById(userID);
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
        
        for (let i = 0; i < followed.length; i++) {
            tempPost = await Post.findById(followed[i].posts);
            pastPosts.push(tempPost)
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
    
    //idk how it works but it removes duplicates and thats all i care about
    const uniqueSet = new Set(pastPosts.map(post => JSON.stringify(post)))
    const noDuplicates = [...uniqueSet].map((item) => {
        if (typeof item === 'string') return JSON.parse(item);
        else if (typeof item === 'object') return item;
      })

    //used to use pastPosts, now noDuplicates
    var droppedNull = noDuplicates.filter(function (x) {
        return x != null;
      });
    droppedNull.sort(function(a,b){
        return new Date(b.datePosted) - new Date(a.datePosted)
      }
    )
    let finalList = []
    for (let i = 0; i < droppedNull.length; i++) {
        let post = droppedNull[i]
        const author = await User.findById(post.author)
        //removed this because removing duplicates makes everything objects or something idk
        // post = post.toObject()
        post.author = {}
        post.author.username = author.username
        post.author.profile_img = author.profile_img
        finalList.push(post)
    }

    // let authorList = []
    // try {
        
    //     for (let i = 0; i < droppedNull.length; i++) {
    //         let tempUser = await User.findById(droppedNull[i].author);
    //         let name = tempUser.username;
    //         let img = tempUser.profile_img;
    //         let tuple = [name, img];
    //         authorList.push(tuple);
    //     }
    // } catch (error) {
    //     return next(error);
    // }
    
    // finalList = []
    // for (let i = 0; i < authorList.length; i++) {
    //     finalList.push({
    //         username: authorList[i][0],
    //         img_path: authorList[i][0],
    //         post: droppedNull[i]
    //      })
    // }
    res.status(200).json({finalList});

}
exports.create = create
exports.like = like
exports.unlike = unlike
exports.comment = comment
exports.retrievePastPosts = retrievePastPosts
exports.retrieveFollowedPosts = retrieveFollowedPosts
exports.postById = postById
exports.fetchRecentPosts = fetchRecentPosts