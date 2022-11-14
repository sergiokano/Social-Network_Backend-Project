const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys')

const UserController = {
  async createUser(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password });
      // -----HERE IN THE FUTURE I HAVE TO ADD ROLE OF USER -------------------------------------!!!
      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Problem by creating a new user", error });
    }
  },

  async loginUser(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).send("Username and/or Password is incorrect")
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send("Username and/or Password is incorrect")
      }
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.token.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Welcome " + user.name, token });
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
      res.send({ message: "You've been logged out" })
    }
    catch (error) {
      res.status(500).send({
        message: "Something went wrong, but don't fret - it's not your fault. Let's try logging out again"
      })
    }
  }
};

module.exports = UserController;
