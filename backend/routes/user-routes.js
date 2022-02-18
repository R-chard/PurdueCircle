const router = require("express").Router()
// import userController from the user-controller file
const userController = require("../controllers/user-controller")

// redirect any URL ending with /signup to the signup function
router.post("/signup",userController.signup)

// export this file so other files can import it
module.exports = router