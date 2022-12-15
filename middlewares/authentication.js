const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ msg: "You're not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ error, message: "There is a problem whith the token" });
  }
};

const isPostAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (!post) {
      return res.status(401).send({ msg: "Error: this post doesn't exist" });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "This post is not yours" });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Error: there have been a problem verifying your authorship",
    });
  }
};

module.exports = { authentication, isPostAuthor };
