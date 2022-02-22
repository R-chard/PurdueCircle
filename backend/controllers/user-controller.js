const User = require("../schemas/users")
const cloudinary = require("../middleware/cloudinary")
const bcrypt = require("bcryptjs")

const signup = async (req,res,next) => {
    // Expecting the frontend to send username, email and password
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
    
    const newUser = new User({username,email,password:hashpwd})
    
    try{
        // save in database
        await newUser.save() 
    } catch(err){
        return next(err)
    }
    req.session.userID = newUser._id.toString()
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

            isValid = true;

        }
    }

    req.session.userID = newUser._id.toString()
    res.json({ isValid });

}

// TODO: Testing
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
exports.uploadProfile = uploadProfile