const express = require("express")
const UserController = require("../controllers/UserController")
const router = express.Router()
// const {authentication} = require("..middlewares/authentication")

router.post("/create",UserController.createUser)
router.post("/login",UserController.loginUser)
router.post("/logout",UserController.logoutUser)




module.exports = router