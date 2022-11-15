const express = require("express")
const PostController = require ("../controllers/PostController")
const router = express.Router()
const { authentication } = require("../middlewares/authentication")

router.post("/create",authentication, PostController.createPost);


module.exports = router;