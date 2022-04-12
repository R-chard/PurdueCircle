const router = require("express").Router()
const postController = require("../controllers/post-controller")
const validation = require("../middleware/validatation")

router.post("/create", validation, postController.create)
router.post("/like",validation,postController.like)
router.post("/unlike",validation,postController.unlike)
router.post("/comment",validation,postController.comment)
router.post("/save",validation,postController.save)
router.get("/postById/:postID",validation,postController.postById)

router.get("/retrievePastPosts", validation, postController.retrievePastPosts)
router.get("/retrieveFollowedPosts", validation, postController.retrieveFollowedPosts)
router.get("/fetchRecentPosts", validation, postController.fetchRecentPosts)
module.exports = router