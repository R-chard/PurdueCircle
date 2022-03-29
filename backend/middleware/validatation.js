// Middleware that only allows access if the user is logged in
const validation = (req,res,next) => {
    if (req.session.userID){
        next()
    } else{
        res.status(403).json({msg:"Unathorized"})
    }
}

module.exports = validation