const User = require("../schemas/users")
const Topic = require("../schemas/topics")
const Post = require("../schemas/posts")
const cloudinary = require("../middleware/cloudinary")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const signup = async (req,res,next) => {
    // Expecting the frontend to send username, email, and password
    const {username,email,password,name} = req.body
    
    // check if user/email exists
    const userBool = await User.findOne({username});
    const emailBool = await User.findOne({email});
    if (userBool){
        res.status(409).json({userBool:false});
        return;
    }
    if (emailBool){
        res.status(409).json({emailBool:false})
        return;
    }

    // Password length validated in schema/users.js 
    // Password then hashed using bcrypt
    let hashpwd;
    try {
        //let salt = await bcrypt.genSalt(15)
        hashpwd = await bcrypt.hash(password, 10);
    } catch (err) {
        return next(err)
    }
    
    const newUser = new User({name,username,email,password:hashpwd,profile_img:"https://res.cloudinary.com/purduecircle/image/upload/v1645303955/default_neaaeo.png"})
    
    try{
        // save in database
        await newUser.save(); 
    } catch(err){
        return next(err);
    }
    req.session.userID = newUser._id.toString()
    res.status(201).json({success:true})
}

const login = async (req, res, next) => {
    const {credentials, password} = req.body;

    // validate whether credentials is email or username

    let currUser;
    let success;

    try {
        currUser = await User.findOne({ username: credentials });
    } catch (err) {
        //return next(err)
        res.status(404).json({ isValid: false }); //change to show 404 error instead of return
        return
    }

    if (!currUser) {
        try {
            currUser = await User.findOne({ email: credentials })
            if(!currUser){
                throw new Error()
            }
        } catch (err) {
            //return next(err)
            res.status(404).json({ isValid: false }); //change to show 404 error instead of return
            return
        }
    }

    let validPassword = false;

    try {
        // compare hashed password with users stored hashed password
        validPassword = await bcrypt.compare(password, currUser.password);
        //validPassword = true //change
    } catch (err) {
        next(err)
    }

    if (!validPassword) {
        success = false;
    } else {

        try {
            await currUser.save();
        } catch (err) {
            return next(err) //change
        }
        success = true;
    }
    
    req.session.userID = currUser._id.toString()
    res.status(200).json({ success });

}

const logout = async(req,res,next) => {
    req.session.destroy(err=>{
        if(err){
            return next(err)
        }
    })
    res.status(200).json({success:true})
}

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

    const userID = req.session.userID

    let topicList;
    let currUser;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
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

    const userID = req.session.userID

    let followedUsers;
    let currUser;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
    }

    followedUsers = currUser.users_followed;
    /*if (topicList.length = 0) {
        return next(error)
    }*/
    //not sure if this is the correct way of sending info to frontend
    //return followedUsers

    let followedUserObjects = []; //added changes to find actual topics
    for (let i = 0; i < followedUsers.length; i++) {
        tempUser = await User.findById(followedUsers[i]);
        followedUserObjects.push(tempUser)
    }
    //res.status(200).json({users_followed: followedUsers})
    
    res.status(200).json({followedUserObjects})
}


const getProfile = async(req,res,next)=>{
    const userID = req.session.userID;
    let currUser;
    try{
        currUser = await User.findById(userID);
    } catch(err){
        return next(err);
    }

    if(!currUser) {
        res.status(404).json({ isFound: false });
    }
    res.status(200).json({currUser});
}

const retrieveFollowingUsers = async (req, res, next) => {

    const userID = req.session.userID

    let followingUsers;
    let currUser;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(new Error(error));
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
        followingUserObjects.push(tempUser)
    }
    // res.status(200).json({users_following: followingUsers})
    res.status(200).json({followingUserObjects})

   
}

const deleteAccount = async (req, res, next) => {

    const userID = req.session.userID;

    try {
        await User.findOneAndDelete({_id: new mongoose.Types.ObjectId(userID)});
    } catch (error) {
        return next(error);
    }

    req.session.destroy(err=>{
        if(err){
            return next(err)
        }
    })
    res.status(200).json({success:true})

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

const searchUser = async (req, res, next) => {
    const username = req.body;

    let searchUser;

    try {
        searchUser = await User.findOne({username});
    } catch (error) {
        next(error);
    }

    if (searchUser) {
        res.status(200).json({
            username: searchUser.username,
            name: searchUser.name,
            profile_img: searchUser.profile_img
        });
    } else {
        res.status(404).json({ isFound: false });
    }
}

const searchUserLogged = async (req, res, next) => {
    const username = req.body;

    let searchUser;

    try {
        searchUser = await User.findOne({username});
    } catch (error) {
        next(error);
    }

    if (searchUser) {
        res.status(200).json({
            username: searchUser.username,
            name: searchUser.name,
            profile_img: searchUser.profile_img,
            users_followed: searchUser.users_followed,
            users_following: searchUser.users_following,
            posts: searchUser.posts,
            biography: searchUser.biography,
            topics_followed: searchUser.topics_followed
        });
    } else {
        res.status(404).json({ isFound: false });
    }
}

const createPost = async (req, res, next) => {
    const userID = req.session.userID;
    const {topics, text} = req.body;

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
            postedAnon: false,
            topics: topics,
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


exports.signup = signup
exports.login = login
exports.editUserInfo = editUserInfo;
exports.retrieveFollowedTopics = retrieveFollowedTopics
exports.retrieveFollowedUsers = retrieveFollowedUsers
exports.retrieveFollowingUsers = retrieveFollowingUsers
exports.uploadProfile = uploadProfile
exports.deleteAccount = deleteAccount
exports.getProfile = getProfile
exports.searchUser = searchUser
exports.searchUserLogged = searchUserLogged
exports.logout = logout
exports.createPost = createPost