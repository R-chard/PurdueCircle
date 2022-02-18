const User = require("../schemas/users")

const signup = async (req,res,next) => {
    // Expecting the frontend to send username, email and password
    const {username,email,password} = req.body
    console.log(req.body)

    // Creating a new row for the user table in the database
    // User({username,email,password}) is the same as 
    // User({username:"John", email:"john@gmail.com", password:"123"})
    // if the username variable = "John", email = "john@gmail.com", password="123"
    // Basically you just need to fill up each field in the schema
    // with a variable
    const newUser = new User({username,email,password})

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

// export this function so another file can import it
exports.signup = signup