const router = require("express").Router()
// import userController from the user-controller file
const userController = require("../controllers/user-controller")
const upload = require("../middleware/image-upload")
const validation = require("../middleware/validatation")

// redirect any URL ending with /signup to the signup function
router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.patch("/update", validation,  userController.editUserInfo)
router.get("/getFollowedTopics", validation, userController.retrieveFollowedTopics)
router.get("/getFollowedUsers", validation, userController.retrieveFollowedUsers)
router.get("/getFollowingUser", validation, userController.retrieveFollowingUsers)
router.get("/getProfile", validation, userController.getProfile)
router.patch("/upload", validation, upload.single("image"),userController.uploadProfile)
router.delete("/delete", validation, userController.deleteAccount)
router.get("/getUser", userController.searchUser)

router.get("/validate",validation,(req,res,next)=>{
    res.send(true)
})

// export this file so other files can import it
module.exports = router