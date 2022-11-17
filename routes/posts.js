const express = require("express")
const PostController = require ("../controllers/PostController")
const router = express.Router()
const { authentication } = require("../middlewares/authentication")

router.post("/create",authentication, PostController.createPost);
router.put("/update/:_id",authentication, PostController.updatePost);
router.delete("/delete/:_id",authentication, PostController.deletePost);
router.get("/getAll",authentication, PostController.getAllPosts);
router.get("/getByName/:description", authentication, PostController.getPostsByName)
router.get("/getById/:_id", authentication, PostController.getPostById)
router.put("/addLike/:_id", authentication, PostController.addLike)
router.get("/likes/:_id", authentication, PostController.getTotalLikes)




module.exports = router;