const router = require("express").Router()
const postController = require("../controllers/post-controller")
const validation = require("../middleware/validatation")

router.post("/create", validation, postController.create)

module.exports = router