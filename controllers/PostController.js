const Post = require("../models/Post");


const PostController = {
  async createPost(req, res) {
    try {
      const post = await Post.create({ ...req.body, postedBy: req.user._id });
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
  // Endpoint to gett all posts and comments with them author and post comments
  async getAllPosts(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find()
        .populate("postedBy")
        .limit(limit)
        .skip((page - 1) * limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to get all posts", error });
    }
  },
  //Endpoint to search by id
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to get post by id", error });
    }
  },

  //Endpoint to search by name
  async getPostsByName(req, res) {
    try {
      const posts = await Post.find({
        $text: {
          $search: req.params.description,
        },
      });
      res.send(posts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Error: Unable to get posts by name", error });
    }
  },

  async addLike(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      if (post.likes.includes(req.user._id)) {
        return res.status(400).send({
          description: post.description,
          totalLikes: post.likes.length,
          msg: "Post alredy liked",
        });
      }
      post.likes.push(req.user._id);
      post.save();
      res.send({
        description: post.description,
        totalLikes: post.likes.length,
        msg: "Post liked",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to like a post", error });
    }
  },

  async removeLike(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      if (post.likes.includes(req.user._id)) {
        post.likes.splice(req.user._id);
        post.save();
        res.send({
          description: post.description,
          totalLikes: post.likes.length,
          msg: "Post unliked",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to remove the like", error });
    }
  },

  async getTotalLikes(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      if (post.likes.length == 0) {
        return res.send({
          description: post.description,
          msg: `This post hasn't likes :(`,
        });
      } else if (post.likes.length == 1) {
        return res.send({
          description: post.description,
          msg: `This post has ${post.likes.length} like`,
        });
      } else {
        return res.send({
          description: post.description,
          msg: `This post has ${post.likes.length} likes`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to like a post", error });
    }
  },
};

module.exports = PostController;
