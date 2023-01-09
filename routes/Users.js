const express = require("express")
const UserController = require("../controllers/UserController")
const router = express.Router()
const { authentication } = require("../middlewares/authentication")

router.post("/create",UserController.createUser)
router.post("/login",UserController.loginUser)
router.delete("/logout", authentication, UserController.logoutUser)
router.get("/conectedUser", authentication, UserController.conectedUser)
router.get("/info", UserController.getInfo)



module.exports = router