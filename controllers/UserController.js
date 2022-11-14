const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {jwt_secret} = required ('.../config/keys.js')

const UserController = {
  async createUser(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({...req.body, password}); 
// -----HERE IN THE FUTURE I HAVE TO ADD ROLE OF USER -------------------------------------!!!
      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Problem by creating a new user", error });
    }
  },

  async login(req, res) {
    try {
      const user = await user.findOne({})
// ----- -------------------------------------!!!
      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Problem by creating a new user", error });
    }
  },
};

module.exports = UserController;
