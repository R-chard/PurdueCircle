const User = require("../schemas/users")
const cloudinary = require("../middleware/cloudinary")
const bcrypt = require("bcryptjs")

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
    res.status(201).json({isValid:true})
}

const login = async (req, res, next) => {
    const {credentials, password} = req.body;

    // validate whether credentials is email or username

    let currUser;
    let isValid;

    try {
        currUser = await User.findOne({ username: credentials });
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
            validPassword = await bcrypt.compare(password, currUser.password);
            //validPassword = true //change
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

    req.session.userID = currUser._id.toString()
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
        res.status(404).json({isFound: false});
        return;
    }

    res.status(200).json({ dataUpdated: true });
    
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
    /*if (topicList.length = 0) {
        return next(error)
    }*/
    //not sure if this is the correct way of sending info to frontend
    //return topicList
    res.status(200).json({topics_followed: topicList})
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
    res.status(200).json({users_followed: followedUsers})
}

const getProfile = async(req,res,next)=>{
    const userID = req.session.userID;
    let currUser;
    try{
        currUser = await User.findById(userID);
    } catch(err){
        return next(err);
    }
    if (currUser) {
        res.status(200).json({currUser});

    } else {
        res.status(404).json({ isFound: false });
    }
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
    res.status(200).json({users_following: followingUsers})
}

const deleteAccount = async (req, res, next) => {

    const userID = req.session.userID;

    let currUser;

    try {
        currUser = await User.findOneAndDelete(userID);
    } catch (error) {
        return next(error);
    }

    if (!currUser) {
        return next(error)
    }

    res.status(200).json({ deleted: true });

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
        res.status(200).json({uploaded:true})
    } catch(err){
        return next(err)
    }
}

const searchUser = async (req, res, next) => {
    const username = req.body;

    let searchUser;

    try {
        searchUser = await User.findOne({username: username});
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
        searchUser = await User.findOne({username: username});
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