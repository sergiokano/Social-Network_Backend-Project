const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  async createUser(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password });
      res.status(201).send({ user, message: "User created" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error: Unable to create a user", error });
    }
  },

  async loginUser(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).send("Username and/or Password is incorrect");
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send("Username and/or Password is incorrect");
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Welcome " + user.name, token, user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async logoutUser(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "You've been logged out" });
    } catch (error) {
      res.status(500).send({
        message:
          "Something went wrong, but don't fret - it's not your fault. Let's try logging out again",
      });
    }
  },
  async conectedUser(req, res) {
    try {
      const user = await User.findById(req.user._id);
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id).populate("postIds");
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
};
module.exports = UserController;
