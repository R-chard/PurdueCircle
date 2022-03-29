const User = require("../schemas/users")
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

    try {
        await User.findByIdAndDelete(userID);
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


exports.signup = signup
exports.login = login
exports.logout = logout
exports.deleteAccount = deleteAccount