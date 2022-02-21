
const validateCookies = (req,res,next) => {
    if (req.session.authenticated){
        next()
    } else{
        res.status(403).json({msg:"Not Authenticated"})
    }
}

module.exports = validateCookies