const User = require("../schemas/users")
const Post = require("../schemas/posts")
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

const deleteAccount = async (req, res, next) => {

    const userID = req.session.userID;
    let user;

    try{
        user = await User.findById(userID)
    } catch(error){
        return next(error)
    }

    // Delete user posts
    try{
        for(let postID of user.posts){
            await Post.findByIdAndDelete(postID)
        }
    } catch(error){
        return next(error)
    }

    // Delete post interactions and saves that deleted user made
    try{
        let interactedUsers = await User.find({
            $or:[
                {"interactions.post":user.posts},
                {"saved_posts":user.posts}
            ]
        })
        let post_ids = user.posts.map(id=>id.toString())
        for(let interactedUser of interactedUsers){
            let unaffectedInteractions = []
            for (let interaction of interactedUser.interactions){
                if (!post_ids.includes(interaction.post.toString())){
                    unaffectedInteractions.push(interaction)
                }
            }
            interactedUser.interactions = unaffectedInteractions
            
            let unaffectedSaves = []
            for (let savedPost of interactedUser.saved_posts){
                if (!post_ids.includes(savedPost.toString())){
                    unaffectedSaves.push(savedPost)
                }
            }
            interactedUser.saved_posts = unaffectedSaves
            await interactedUser.save()
        }

    } catch(error){
        return next(error)
    }

    // TODO: Comments and likes if have time

    //Remove self from users following and followed
    try{
        for(let usersFollowedID of user.users_followed){
            let usersFollowed = await User.findById(usersFollowedID)
            let indexToDel = -1
            for(let i = 0; i<usersFollowed.users_following.length; i++){
                if (usersFollowed.users_following[i] == userID.toString()){
                    indexToDel = i
                }
            }
            if(indexToDel === -1){
                return next(new Error("Unexpected missing following user from the user's followed list"))
            }
            usersFollowed.users_following.splice(indexToDel,1)
            usersFollowed.save()
        }

        for(let usersFollowingID of user.users_following){
            let usersFollowing = await User.findById(usersFollowingID)
            let indexToDel = -1
            for(let i = 0; i<usersFollowing.users_followed.length; i++){
                if (usersFollowing.users_followed[i] == userID.toString()){
                    indexToDel = i
                }
            }
            if(indexToDel === -1){
                return next(new Error("Unexpected missing followed user from the user's following list"))
            }
            usersFollowing.users_followed.splice(indexToDel,1)
            usersFollowing.save()
        }

    } catch(error){
        return next(error);
    }

    // Delete users
    try{
        await User.findByIdAndDelete(userID);
    } catch(error){
        return next(error)
    }

    // Delete login sessions
    req.session.destroy(error=>{
        if(error){
            return next(error)
        }
    })

    res.status(200).json({success:true})

}


exports.signup = signup
exports.login = login
exports.logout = logout
exports.deleteAccount = deleteAccount