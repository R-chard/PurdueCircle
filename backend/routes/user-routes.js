const router = require("express").Router()
const userController = require("../controllers/user-controller")
const upload = require("../middleware/image-upload")
const validation = require("../middleware/validatation")

router.patch("/update", validation,  userController.editUserInfo)
router.patch("/upload", validation, upload.single("image"),userController.uploadProfile)

router.get("/getUser",validation, userController.getUser)
router.get("/profile/:username",userController.getProfile)
router.get("/following/:username",userController.retrieveFollowingUsers)
router.get("/followers/:username",userController.retrieveFollowedUsers)
router.get("/topics/:username",userController.retrieveFollowedTopics)

router.post("/follow/",validation,userController.followUser)
router.post("/unfollow/",validation,userController.unfollowUser)

module.exports = router