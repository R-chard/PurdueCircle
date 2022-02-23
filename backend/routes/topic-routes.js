const router = require("express").Router()
// import userController from the user-controller file
const topicController = require("../controllers/topic-controller")
const upload = require("../middleware/image-upload")

// redirect any URL ending with /signup to the signup function

//TODO change
router.post("/signup",userController.signup)
router.post("/login", userController.login)
router.patch("/upload",upload.single("image"),userController.uploadProfile)

// export this file so other files can import it
module.exports = router