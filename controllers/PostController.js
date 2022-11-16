const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
  async createPost(req, res) {
    try {
      const post = await Post.create({...req.body, postedBy: req.user._id});
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
  // Endpoint para traer todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post
  async getInfo(req, res) {
    try {
      const post = await Post.find()
      .populate("postedBy")
       res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to get all posts", error });
    }
  },
  // Endpoint para buscar post por id
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params._id)
       res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to get post by id", error });
    }
  },


  // Endpoint para buscar post por nombre
    async getPostsByName (req, res) {
    try {
      const posts = await Post.find({
        $text: {
          $search: req.params.description,
        },
      });
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to get posts by name", error })
      };
    }

};


module.exports = PostController;
