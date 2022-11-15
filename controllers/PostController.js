const Post = require("../models/post"); 
const User = require("../models/user") ;

const PostController = {
    async createPost (req, res) {
        try {
            const post = await Post.create(req.body)
            res.status(201).send(post);
        } catch (error) {
            console.error(error);
            res
            .status(500)
            .send({ msg: "Error: Unable to create a post", error})
        }
    },

}

module.exports = PostController;