const User = require("../schemas/users")
const cloudinary = require("../middleware/cloudinary")

const signup = async (req,res,next) => {
    // Expecting the frontend to send username, email, and password
    const {username,email,password} = req.body

    // Creating a new row for the user table in the database
    // User({username,email,password}) is the same as 
    // User({username:"John", email:"john@gmail.com", password:"123"})
    // if the username variable = "John", email = "john@gmail.com", password="123"
    // Basically you just need to fill up each field in the schema
    // with a variable

    
    // Password length validated in schema/users.js 
    // Password then hashed using bcrypt
    let hashpwd;
    try {
        const salt = await bcrypt.genSalt(15)
        hashpwd = await bcrypt.hash(password, salt);
    } catch (err) {
        return next(new DatabaseError(err.message));
    }

    // Creating a new row for the user table in the database
    // User({username,email,password}) is the same as 
    // User({username:"John", email:"john@gmail.com", password:"123"})
    // if the username variable = "John", email = "john@gmail.com", password="123"
    // Basically you just need to fill up each field in the schema
    // with a variable
    const newUser = new User({
        username,
        email,
        password: hashpwd,
        name: "",
        phone: -1,
        profile_img: "",
        topics_followed: [],
        biography: "",
        users_followed: [],
        users_following: [],
        posts: [],
        saved_posts: []
    })

    try{
        // save in database
        await newUser.save()
    } catch(err){
        // TODO: deal with errors
        return next(err)
    }
    // The frontend will receive {signedIn:"<username> has signed up}. 201 means you created something successfully
    res.status(201).json({signedIn: username + " has signed up"})
}

const login = async (req, res, next) => {
    const {username, password} = req.body;

    // validate whether username is email or username

    let currUser;
    let isValid;

    try {
        currUser = await User.findOne({ username });
    } catch (err) {
        // need to create error object to handle this
        return next(err)
    }


    if (!currUser) {
        try {
            currUser = await User.findOne({ email: username })
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

            // send cookie to user depending on id and username
            res.send("cookie") //change
            isValid = true;

        }
    }

    res.json({ isValid });

}

const editUserInfo = async (req, res, next) => {
    
    const userID = req.userID;
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

    res.json({ dataUpdated: true });
    
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


const retrieveFollowingUsers = async (req, res, next) => {

    const userID = req.userID

    let followingUsers;
    let currUser;

    try {
        currUser = await User.findById(userID);
    } catch (error) {
        return next("User not found");
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

const logout = as

// TODO: Modify when we have cookies from login / signup
const uploadProfile = async (req,res,next) =>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        const newUser = new User({
            username:"Tim",
            email:"tim@gmail.com",
            password:"123",
            profile_img: result.secure_url,
            cloudinary_id:result.public_id
        })
        await newUser.save()
        res.json({uploaded:true})
    } catch(err){
        console.log(err)
    }
    
}

// export this function so another file can import it
exports.signup = signup
exports.login = login
exports.editUserInfo = editUserInfo;
exports.retrieveFollowedTopics = retrieveFollowedTopics
exports.retrieveFollowedUsers = retrieveFollowedUsers
exports.retrieveFollowingUsers = retrieveFollowingUsers
exports.uploadProfile = uploadProfile
exports.deleteAccount = deleteAccount