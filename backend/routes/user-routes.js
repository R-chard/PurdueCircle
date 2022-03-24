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
router.patch("/upload", validation, upload.single("image"),userController.uploadProfile)
router.delete("/delete", validation, userController.deleteAccount)

router.get("/getUser",validation, userController.getUser)
router.get("/profile/:username",userController.getProfile)
router.get("/following/:username",userController.retrieveFollowingUsers)
router.get("/followers/:username",userController.retrieveFollowedUsers)
router.get("/topics/:username",userController.retrieveFollowedTopics)
router.post("/createPost", validation, userController.createPost)

router.get("/validate",validation,(req,res,next)=>{
    res.status(200).send(true)
})

// export this file so other files can import it
module.exports = router