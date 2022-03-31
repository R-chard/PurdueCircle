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
    /*if (topicList.length = 0) {
        return next(error)
    }*/
    //not sure if this is the correct way of sending info to frontend
    //return followingUsers
    let intUserObjects = []; //added changes to find actual users
    for (let i = 0; i < interactions.length; i++) {
        tempPost = await Post.findById(interactions[i].post);
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
    
    let postObjects = []
    let reqUser
    try{
        reqUser = await User.findOne({username})
        reqUser = reqUser.toObject()
        // user does not exist
        if(!reqUser){
            res.status(404).json({isFound:false})
        }

        for (let i = 0; i < reqUser.posts.length; i++) {
            tempPost = await Post.findById(reqUser.posts[i])
            postObjects.push(tempPost)
        }
        
        if(currUserID){
            if(currUserID == reqUser._id){
                reqUser.selfProfile = true
            // if the user is logged in and looking at someone else's account
            } else{
                if (reqUser.users_following.includes(currUserID)){
                    // current user is following the selected user
                    reqUser.following = true
                } else{
                    // current user is not following the selected user
                    reqUser.following = false
                }
            }
            
        }
    } catch (err){
        return next(err)
    }
    res.status(200).json({
        user: reqUser,
        posts: postObjects
    })
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

    user.users_followed.push(otherUserID)
    user.save()

    otherUser.users_following.push(userID)
    otherUser.save()

    res.status(200).json({success:true})
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

    const followedUserIndex = user.users_followed.indexOf(otherUserID)
    user.users_followed.splice(followedUserIndex,1)
    user.save()

    const selfIndex = otherUser.users_following.indexOf(userID)
    otherUser.users_following.splice(selfIndex,1)
    otherUser.save()

    res.status(200).json({success:true})
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