const mongoose = require("mongoose");

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
    // userConected: [{ type: req.user, ref: "UserId"}],
  },
  { timestamps: true }
);

// UserSchema.index({
//   name: "text",
// });

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
