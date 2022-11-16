const express = require("express")
const PostController = require ("../controllers/PostController")
const router = express.Router()
const { authentication } = require("../middlewares/authentication")

router.post("/create",authentication, PostController.createPost);
router.put("/update/:_id",authentication, PostController.updatePost);



module.exports = router;