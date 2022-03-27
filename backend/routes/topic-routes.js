const router = require("express").Router()
// import userController from the user-controller file
const topicController = require("../controllers/topic-controller")

router.get("/search/:query",topicController.search)
router.get("/getposts/:title",topicController.getPostsByTopic)
router.post("/follow",topicController.followTopic)
router.post("/unfollow",topicController.unfollowTopic)

module.exports = router