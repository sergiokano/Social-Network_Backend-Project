const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, fill in your name"],
    },
    email: {
      type: String,
      match: [
        /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/,
        "Please enter a valid email address",
      ],
      unique: true,
      required: [true, "Please, fill in your email"],
    },
    password: String,
    tokens: [],
    postIds: [{ type: ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  delete user.__v;
  delete user.updatedAt;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
