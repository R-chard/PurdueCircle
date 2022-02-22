const User = require("../schemas/users")
const cloudinary = require("../middleware/cloudinary")
const bcrypt = require("bcryptjs")

const signup = async (req,res,next) => {
    // Expecting the frontend to send username, email, and password
    const {username,email,password} = req.body

    // Password length validated in schema/users.js 
    // Password then hashed using bcrypt
    let hashpwd;
    try {
        let salt = await bcrypt.genSalt(15)
        hashpwd = await bcrypt.hash(password, salt);
    } catch (err) {
        return next(err)
    }
    
    const newUser = new User({username,email,password:hashpwd,profile_img:"https://res.cloudinary.com/purduecircle/image/upload/v1645303955/default_neaaeo.png"})
    
    try{
        // save in database
        await newUser.save() 
    } catch(err){
        return next(err)
    }
    req.session.userID = newUser._id.toString()
    res.status(201).json({isValid:true})
}

const login = async (req, res, next) => {
    const {credentials, password} = req.body;

    // validate whether credentials is email or username

    let currUser;
    let isValid;

    try {
        currUser = await User.findOne({ credentials });
    } catch (err) {
        // need to create error object to handle this
        return next(err)
    }


    if (!currUser) {
        try {
            currUser = await User.findOne({ email: credentials })
        } catch (err) {
            return next(err)
        }
    }

    if (!currUser) {
        isValid = false;
    } else {
        let validPassword = false;

        try {
            // compare hashed password with users stored hashed password
            
            validPassword = true //change
        } catch (err) {
            next(err)
        }

        if (!validPassword) {
            isValid = false;
        } else {

            try {
                await currUser.save();
            } catch (err) {
                return next(err) //change
            }

            isValid = true;

        }
    }

    req.session.userID = newUser._id.toString()
    res.status(200).json({ isValid });

}

const editUserInfo = async (req, res, next) => {
    
    const userID = req.session.userID;
    const {name, biography} = req.body;
    
    let currUser;
    
    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(error);
    }

    if (currUser) {
        if (name) {
            currUser.name = name;
        }
        if (biography) {
            currUser.biography = biography;
        }

        try {
            await currUser.save();
        } catch (error) {
            return next(error);
        }

    } else {
        return next("User not found in database")
    }

    res.status(200).json({ dataUpdated: true });
    
}

const retrieveFollowedTopics = async (req, res, next) => {

    const userID = req.userID

    let topicList;
    let currUser;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next("User not found");
    }

    topicList = currUser.topics_followed;
    if (topicList.length = 0) {
        return next("User does not currently follow any topics")
    }
    //not sure if this is the correct way of sending info to frontend
    return topicList
}

const retrieveFollowedUsers = async (req, res, next) => {

    const userID = req.userID

    let followedUsers;
    let currUser;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next("User not found");
    }

    followedUsers = currUser.users_followed;
    if (topicList.length = 0) {
        return next("User does not currently follow anyone")
    }
    //not sure if this is the correct way of sending info to frontend
    return followedUsers
}

const getProfile = async(req,res,next)=>{
    const userID = req.session.userID
    let user
    try{
        user = await User.findById(userID)
    } catch(err){
        return next(err)
    }
    res.json({user})
}

const retrieveFollowingUsers = async (req, res, next) => {

    const userID = req.userID

    let followingUsers;
    let currUser;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next(new Error("User not found"));
    }

    followingUsers = currUser.users_following;
    if (topicList.length = 0) {
        return next("User does not currently have any followers")
    }
    //not sure if this is the correct way of sending info to frontend
    return followingUsers
}

const deleteAccount = async (req, res, next) => {

    const userID = req.userID;

    let currUser;

    try {
        currUser = await User.findOneAndDelete(userID);
    } catch (error) {
        return next(error);
    }

    if (!currUser) {
        return next("User ID not found in database")
    }

    res.json({ deleted: true });

}
// TODO: Modify when we have cookies from login / signup
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
        res.json({uploaded:true})
    } catch(err){
        return next(err)
    }
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