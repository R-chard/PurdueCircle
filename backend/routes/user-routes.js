const router = require("express").Router()
// import userController from the user-controller file
const userController = require("../controllers/user-controller")
const upload = require("../middleware/image-upload")
const validation = require("../middleware/validatation")

// --Authentication
router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.delete("/logout",validation, userController.logout)

router.patch("/update", validation,  userController.editUserInfo)
router.get("/getFollowedTopics", validation, userController.retrieveFollowedTopics)
router.get("/getFollowedUsers", validation, userController.retrieveFollowedUsers)
router.get("/getFollowingUser", validation, userController.retrieveFollowingUsers)
router.get("/getProfile", validation, userController.getProfile)
router.patch("/upload", validation, upload.single("image"),userController.uploadProfile)
router.delete("/delete", validation, userController.deleteAccount)
router.get("/getUser", userController.searchUser)
router.get("/getUserLogged", validation, userController.searchUserLogged)

router.post("/createPost", validation, userController.createPost)


router.get("/validate",validation,(req,res,next)=>{
    res.status(200).send(true)
})

// export this file so other files can import it
module.exports = router