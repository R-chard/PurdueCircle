const User = require("../schemas/users")
const Topic = require("../schemas/topics")
const Post = require("../schemas/posts")
const cloudinary = require("../middleware/cloudinary")
const bcrypt = require("bcryptjs")

const editUserInfo = async (req, res, next) => {
    
    const userID = req.session.userID;
    const {name, biography,username,password,email,phone} = req.body;
    let currUser;
    
    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
    }

    if (currUser) {
        currUser.name = name
        currUser.biography = biography
        currUser.username = username
        currUser.email = email
        currUser.phone = phone

        try{
            if (password){
                hashpwd = await bcrypt.hash(password, 10);
                currUser.password = hashpwd
            }
            await currUser.save();
        } catch (error) {
            return next(error);
        }

    } else {
        res.status(404).json({success: false});
        return;
    }

    res.status(200).json({ success: true });
    
}

const retrieveFollowedTopics = async (req, res, next) => {

    const username = req.params.username

    let topicList;
    let currUser;

    try {
        currUser = await User.findOne({username});
    } catch (error) {
        return next(error);
    }
    if(!currUser){
        res.status(404).json({isFound:false})
        return
    }

    topicList = currUser.topics_followed;

    let followedTopicObjects = []; //added changes to find actual users
    for (let i = 0; i < topicList.length; i++) {
        tempTopic = await Topic.findById(topicList[i]);
        followedTopicObjects.push(tempTopic)
    }
    res.status(200).json({followedTopicObjects})
}

const retrieveFollowedUsers = async (req, res, next) => {

    const username = req.params.username

    let followedUsers;
    let currUser;

    try {
        currUser = await User.findOne({username});
    } catch (error) {
        return next(error);
    }

    if(!currUser){
        res.status(404).json({isFound:false})
        return
    }

    followedUsers = currUser.users_followed;

    let followedUserObjects = []; //added changes to find actual topics
    for (let i = 0; i < followedUsers.length; i++) {
        
        tempUser = await User.findById(followedUsers[i]);
        if (tempUser){
            followedUserObjects.push(tempUser)
        }
    }

    res.status(200).json({followedUserObjects})
}

const retrieveFollowingUsers = async (req, res, next) => {

    const username = req.params.username

    let followingUsers;
    let currUser;

    try {
        currUser = await User.findOne({username});
    } catch (error) {
        return next(new Error(error));
    }
    if(!currUser){
        res.status(404).json({isFound:false})
        return
    }

    followingUsers = currUser.users_following;
    /*if (topicList.length = 0) {
        return next(error)
    }*/
    //not sure if this is the correct way of sending info to frontend
    //return followingUsers
    let followingUserObjects = []; //added changes to find actual users
    for (let i = 0; i < followingUsers.length; i++) {
        tempUser = await User.findById(followingUsers[i]);
        if (tempUser){
            followingUserObjects.push(tempUser)
        }
    }
    // res.status(200).json({users_following: followingUsers})
    res.status(200).json({followingUserObjects})

   
}

const retrieveInteractions = async (req, res, next) => {

    const username = req.params.username

    let interactions;
    let currUser;

    try {
        currUser = await User.findOne({username});
    } catch (error) {
        return next(new Error(error));
    }
    if(!currUser){
        res.status(404).json({isFound:false})
        return
    }

    interactions = currUser.interactions;
    let intUserObjects = []; //added changes to find actual users
    for (let i = 0; i < interactions.length; i++) {
        tempPost = await Post.findById(interactions[i].post);
        // prevents deleted posts from being added
        if (tempPost){
            intUserObjects.push({
                post: tempPost,
                date: interactions[i].date,
                type: interactions[i].type
            })
        }
    }
    // res.status(200).json({users_following: followingUsers})
    res.status(200).json({intUserObjects})
}

// Works even if user is not logged in
const getProfile = async(req,res,next)=>{
    const currUserID = req.session.userID
    const username = req.params.username
    const page = req.query.page
    const limit = 5;
    
    let reqUser

    try{

        // user is logged in
        if(currUserID){
            // retrieve details to render page
            reqUser = await User.findOne({username})
            .populate("posts interactions.post")
            .populate([{
                path:"posts",
                populate:{
                    path:"author",
                    select:"username profile_img",
                }},{
                path:"interactions.post",
                populate:{
                    path:"author",
                    select:"username profile_img"
                }},{
                path:"saved_posts",
                populate:{
                    path:"author",
                    select:"username profile_img"
                }
                }])

        // user is not logged in. Details are unnecessary
        } else{
            reqUser = await User.findOne({username})
        }
        
        // user does not exist
        if(!reqUser){
            const user = {isFound:false}
            res.status(200).json({user})
            return
        }

        reqUser = reqUser.toObject()
        if(currUserID){
            reqUser.loggedIn = true
            // reqUser is self
            if (currUserID == reqUser._id){
                reqUser.selfProfile = true
                reqUser.posts = reqUser.posts.reverse()
                reqUser.saved_posts = reqUser.saved_posts.reverse() 
                reqUser.saved_posts = reqUser.saved_posts.slice((page-1)*limit,page*limit)

                for(let i =0;i<reqUser.saved_posts.length;i++){
                    if (reqUser.saved_posts[i]){
                        reqUser.saved_posts[i].hasLiked = false
                        for(let j =0; j<reqUser.saved_posts[i].usersLiked.length;j++){
                            if (reqUser.saved_posts[i].usersLiked[j].toString() === currUserID){
                                reqUser.saved_posts[i].hasLiked = true
                            }
                        }
                    }
                }

            // reqUser is another user
            } else{
                // current user is not following the selected user
                reqUser.following = false
                for (let user of reqUser.users_followed){
                    if (user.toString() === currUserID){
                        reqUser.following = true
                    }
                }
                reqUser.saved_posts = null
                reqUser.posts = reqUser.posts.filter(post=>!post.postedAnon).reverse()
            }
            reqUser.posts = reqUser.posts.slice((page-1)*limit,page*limit)
            reqUser.interactions = reqUser.interactions.reverse() 
            reqUser.interactions = reqUser.interactions.slice((page-1)*limit,page*limit)

            // iterate through posts to add hasLiked
            for(let i = 0; i<reqUser.posts.length;i++){
                reqUser.posts[i].hasLiked = false
                for(let j=0;j<reqUser.posts[i].usersLiked.length;j++){
                    if(reqUser.posts[i].usersLiked[j].toString() === currUserID){
                        reqUser.posts[i].hasLiked = true
                    }
                }
            }
            
            let filteredInteractions = []
            // iterate thorugh interactions to add hasLiked
            for(let i = 0; i<reqUser.interactions.length;i++){
                if (reqUser.interactions[i].post){
                    reqUser.interactions[i].post.hasLiked = false
                    for(let j =0; j<reqUser.interactions[i].post.usersLiked.length;j++){
                        if (reqUser.interactions[i].post.usersLiked[j].toString() === currUserID){
                            reqUser.interactions[i].post.hasLiked = true
                        }
                    }
                    filteredInteractions.push(reqUser.interactions[i])
                }
            }

            reqUser.interactions = filteredInteractions
        }
    } catch (err){
        return next(err)
    }
    res.status(200).json({user:reqUser})
}

const getUser = async (req,res,next) => {
    const userID = req.session.userID
    let currUser
    try{
        currUser = await User.findById(userID)
    } catch(err){
        return next(err)
    }
    if(!currUser) {
        res.status(404).json({ isFound: false });
        return
    }
    res.status(200).json({currUser});
}

const uploadProfile = async (req,res,next) =>{
    try{
        const cloud = await cloudinary.uploader.upload(req.file.path)

        try{
            const user = await User.findById(req.session.userID)
            user.profile_img = cloud.secure_url
            await user.save()
        } catch(err){
            return next(err)
        }
        res.status(200).json({uploaded:true})
    } catch(err){
        return next(err)
    }
}

const followUser = async(req,res,next) => {
    const otherUserID = req.body.otherUser
    const userID = req.session.userID

    let user
    let otherUser

    try{
        user = await User.findById(userID)
        otherUser = await User.findById(otherUserID)
    } catch(err){
        return next(err)
    }

    if(!user || !otherUser){
        res.status(404).json({isFound:false})
        return
    }
    let repeatedFollow = false
    for(let userFollowing of user.users_following){
        if (userFollowing.toString() == otherUserID){
            repeatedFollow = true
            break
        }
    }
    if(!repeatedFollow){
        user.users_following.push(otherUserID)
        user.save()

        otherUser.users_followed.push(userID)
        otherUser.save()
        res.status(200).json({success:true}) 
    }
    else{
        res.status(200).json({success:false})
    }
}

const unfollowUser = async(req,res,next) => {
    const otherUserID = req.body.otherUser
    const userID = req.session.userID

    let user
    let otherUser

    try{
        user = await User.findById(userID)
        otherUser = await User.findById(otherUserID)
    } catch(err){
        return next(err)
    }

    if(!user || !otherUser){
        res.status(404).json({isFound:false})
        return
    }

    let repeatedUnfollow = false
    for(let userFollowing of user.users_following){
        if (userFollowing.toString() == otherUserID){
            repeatedFollow = true
        }
    }

    if(!repeatedUnfollow){
        const followingUserIndex = user.users_following.indexOf(otherUserID)
        if(followingUserIndex === -1){
            return new Error("Unexpected missing otherUser from the user's following list")
        }
        user.users_following.splice(followingUserIndex,1)
        user.save()

        const selfIndex = otherUser.users_followed.indexOf(userID)
        if(selfIndex === -1){
            return new Error("Unexpected missing user from the otherUser's following list")
        }
        otherUser.users_followed.splice(selfIndex,1)
        otherUser.save()

        res.status(200).json({success:true})
    }
    else{
        res.status(200).json({success:false})
    }
}

exports.editUserInfo = editUserInfo;
exports.retrieveFollowedTopics = retrieveFollowedTopics
exports.retrieveFollowedUsers = retrieveFollowedUsers
exports.retrieveFollowingUsers = retrieveFollowingUsers
exports.uploadProfile = uploadProfile
exports.getProfile = getProfile
exports.getUser = getUser
exports.followUser = followUser
exports.unfollowUser = unfollowUser
exports.retrieveInteractions = retrieveInteractions