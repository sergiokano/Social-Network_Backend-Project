const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
  async createPost(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to create a post", error });
    }
  },
  async updatePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.status(201).send({ message: "Post updated", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to update a post", error });
    }
  },
  async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.status(200).send({ message: "Post deleted", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to delete a post", error });
    }
  },
};


module.exports = PostController;
