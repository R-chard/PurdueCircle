const router = require("express").Router()
// import userController from the user-controller file
const userController = require("../controllers/user-controller")
const upload = require("../middleware/image-upload")

// redirect any URL ending with /signup to the signup function
router.post("/signup",userController.signup)
router.patch("/upload",upload.single("image"),userController.uploadProfile)

// export this file so other files can import it
module.exports = router