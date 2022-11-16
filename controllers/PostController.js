const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
    async createPost(req, res) {
        try {
            const post = await Post.create(req.body)
            res.status(201).send(post);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "Error: Unable to create a post", error })
        }
    },
    async updatePost(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                req.body,
                { new: true }
              )
            res.status(201).send({message: "Post updated", post})
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "Error: Unable to update a post", error })
        }
    },

    // async updatePost(req, res) {
    //     try {
    //         const old_post = await Post.findById(req.params._id)
    //         if(!old_post) {
    //             return res.status(404).send({ message: `No post with id ${req.params._id}` })
    //         }
    //         const post = await Post.findByIdAndUpdate(
    //             req.params._id,
    //             { ...req.body,  userId: req.user._id},
    //             {
    //               new: true,
    //             }
    //         );
    //         if ( old_post.post_img && post.post_img !== old_post.post_img ) {
    //             const dir = path.resolve("./");
    //             await unlink(path.join(dir, old_post.post_img));
    //         }
    //         res.status(201).send({message: "Post updated", post})
    //     } catch (error) {
    //         const dir = path.resolve("./");
    //         await unlink(path.join(dir, req.body.post_img));
    //         console.error(error)
    //         res.status(500).send({ message: 'There was a problem updating the post', error })
    //     }
    // },


};

module.exports = PostController;