const router = require("express").Router()
const postController = require("../controllers/post-controller")
const validation = require("../middleware/validatation")

router.post("/create", validation, postController.create)
router.post("/like",validation,postController.like)

router.get("/retrievePastPosts", validation, postController.retrievePastPosts)
module.exports = router