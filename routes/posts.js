const express = require("express")
const PostController = require ("../controllers/PostController")
const router = express.Router()
const { authentication, isPostAuthor } = require("../middlewares/authentication")

router.post("/create",authentication, PostController.createPost);
router.put("/update/:_id",authentication, isPostAuthor, PostController.updatePost);
router.delete("/delete/:_id",authentication, PostController.deletePost);
router.get("/getAll", PostController.getAllPosts);
router.get("/getByName/:description", PostController.getPostsByName)
router.get("/getById/:_id", PostController.getPostById)
router.put("/addLike/:_id", authentication, PostController.addLike)
router.put("/removeLike/:_id", authentication, PostController.removeLike)
router.get("/likes/:_id", authentication, PostController.getTotalLikes)





module.exports = router;