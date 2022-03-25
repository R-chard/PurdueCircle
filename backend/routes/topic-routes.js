const router = require("express").Router()
// import userController from the user-controller file
const topicController = require("../controllers/topic-controller")

router.get("/search/:query",topicController.search)
module.exports = router