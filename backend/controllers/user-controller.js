const User = require("../schemas/users")
const cloudinary = require("../middleware/cloudinary")

const signup = async (req,res,next) => {
    // Expecting the frontend to send username, email and password
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
    const newUser = new User({username,email,password:hashpwd})

    try{
        // save in database
        await newUser.save()
    } catch(err){
        // TODO: deal with errors
        console.log(err)
    }
    // The frontend will receive {signedIn:"<username> has signed up}. 201 means you created something successfully
    res.status(201).json({signedIn: username + " has signed up"})
}

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
exports.uploadProfile = uploadProfile