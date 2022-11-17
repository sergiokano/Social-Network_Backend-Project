const express = require("express")
const CommentController = require("../controllers/CommentController")
const router = express.Router()
const { authentication } = require("../middlewares/authentication")

router.post("/create/:_id",authentication, CommentController.createComment);



module.exports = router