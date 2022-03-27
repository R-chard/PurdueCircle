const router = require("express").Router()
const authController = require("../controllers/auth-controller")
const validation = require("../middleware/validatation")

// --Authentication
router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.delete("/logout",validation, authController.logout)
router.delete("/delete", validation, authController.deleteAccount)

router.get("/validate",validation,(req,res,next)=>{
    res.status(200).send(true)
})

// export this file so other files can import it
module.exports = router