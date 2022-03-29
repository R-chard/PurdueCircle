const router = require("express").Router()
const postController = require("../controllers/post-controller")
const validation = require("../middleware/validatation")

router.post("/create", validation, postController.create)
router.post("/like",validation,postController.like)
router.post("/unlike",validation,postController.unlike)
router.post("/comment",validation,postController.comment)

router.get("/retrievePastPosts", validation, postController.retrievePastPosts)
module.exports = router